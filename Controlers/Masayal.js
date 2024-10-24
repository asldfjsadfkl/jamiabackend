const MASAYAL = require("../Models/Masayal.js");
const express = require("express");
const router = express.Router();
const isAuth = require("../Utils/Auth.js");

const articles = router
  .post("/createmasayal", isAuth, async (req, res) => {
    try {
      const msl = await MASAYAL.create({
        question: req.body.question,
        answer: req.body.answer,
      });
      if (msl) {
        res.status(201).json({
          success: true,
          msl,
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
  .get("/:id", isAuth, async (req, res) => {
    try {
      const msl = await MASAYAL.findById(req.params.id);
      if (msl) {
        res.status(200).json({
          msl,
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
  .delete("/deleteone/:id", isAuth, async (req, res) => {
    try {
      const msl = await MASAYAL.findByIdAndDelete(req.params.id);
      if (msl) {
        res.status(200).json({
          msl,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .patch("/updatemasla/:id", isAuth, async (req, res) => {
    try {
      const msl = await MASAYAL.findByIdAndUpdate(req.params.id, {
        question: req.body.question,
        answer: req.body.answer,
      });
      if (msl) {
        res.status(201).json({
          msl,
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
  .get("/all/search", async (req, res) => {
    const { search, page, limit } = req.query;
    const encoded = decodeURIComponent(search);
    const skip = (page - 1) * limit;

    try {
      const masayals = await MASAYAL.find({
        $or: [
          {
            question: { $regex: encoded, $options: "i" },
          },
        ],
      })
        .skip(skip)
        .limit(parseInt(limit));
      const countDoc = await MASAYAL.countDocuments();
      const pagination = {};
      pagination.totalPages = Math.ceil(countDoc / limit);
      if ((page - 1) * limit > 0) {
        pagination.prev = {
          page: page - 1,
        };
      }
      if (page * limit < countDoc) {
        pagination.nexts = {
          page: page + 1,
        };
      }
      if (masayals) {
        res.status(200).json({
          success: true,
          masayals,
          pagination,
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

module.exports = articles;
