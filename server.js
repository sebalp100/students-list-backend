const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const studentRoutes = require("./src/student/routes")
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
})

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
