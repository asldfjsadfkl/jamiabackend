const express = require("express");
const router = express.Router();
const STUDENT = require("../Models/Student.js");
const isAuth = require("../Utils/Auth.js");
const TEACHER = require("../Models/Teacher.js");
const MASAYAL = require("../Models/Masayal.js");
// const QUESTION = require("../Models/Question.js");
const ARTICLE = require("../Models/Articles");

const dashboard = router.get("/dashboarddata", isAuth, async (req, res) => {
  try {
    const data = {};
    const student = await STUDENT.find({});
    const teacher = await TEACHER.find();
    const masayal = await MASAYAL.find();
    const articles = await ARTICLE.find();

    // data.length
    data.stdlength = student.length;
    console.log(student.length);
    data.techlength = teacher.length;
    data.artlength = articles.length;
    data.masayalLength = masayal.length;
    // data
    data.student = student;
    data.teacher = teacher;
    data.article = articles;
    data.masayal = masayal;

    res.status(200).json({
      message: "Dashboard",
      data,
    });
  } catch (error) {}
});
module.exports = dashboard;
