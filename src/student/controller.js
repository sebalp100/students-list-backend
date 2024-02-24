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
        res.status(201).send("Student created successfully");
      })
    }
  });

}

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);
}

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
}
