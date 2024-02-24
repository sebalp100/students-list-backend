const pool = require("../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })

}

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
    } else {

      pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
        if (error) throw error;
        res.status(201).send("Student created successfully.");
      })
    }
  });

}

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exists in our database.");
    }

    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student deleted successfully.");
    })
  })
}

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  if (!name || Object.keys(req.body).length !== 1) {
    return res.status(400).send("Only the name field can be updated.");
  }

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      return res.status(404).send("Student does not exist in our database.");
    } else {
      pool.query(queries.updateStudent, [name, id], (error, results) => {
        if (error) {
          console.error("Error updating student:", error);
          return res.status(500).send("Internal Server Error");
        }
        res.status(200).send("Student name updated successfully.");
      });
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
}
