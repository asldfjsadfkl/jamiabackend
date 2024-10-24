const TEACHER = require("../Models/Teacher.js");
const express = require("express");
const router = express.Router();

const teacher = router
  .post("/teachercreate", async (req, res) => {
    try {
      const teacher = await TEACHER.create({
        name: req.body.name,
        fName: req.body.fName,
        status: req.body.status,
        distract: req.body.distract,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
      });
      if (teacher) {
        res.status(201).json({
          success: true,
          teacher,
        });
      } else {
        res.status(401).json({
          message: "Not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .get("/all", async (req, res) => {
    try {
      const teachers = await TEACHER.find();
      if (teachers) {
        res.status(200).json({
          success: true,
          teachers,
        });
      } else {
        res.status(401).json({
          message: "Not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const teacher = await TEACHER.findById(req.params.id);
      if (teacher) {
        res.status(200).json({
          teacher,
        });
      } else {
        res.status(401).json({
          message: "Not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const teacher = await TEACHER.findByIdAndDelete(req.params.id);
      if (teacher) {
        res.status(200).json({
          teacher,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .patch("/:id", async (req, res) => {
    try {
      const teacher = await TEACHER.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        fName: req.body.fName,
        status: req.body.status,
        distract: req.body.distract,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
      });
      if (teacher) {
        res.status(201).json({
          teacher,
        });
      } else {
        res.status(401).json({
          message: "Not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

module.exports = teacher;
