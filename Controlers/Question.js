const QUESTION = require('../Models/Question.js');
const express = require("express");
const router = express.Router();

const question = router
    .post("/createquestion", async (req, res) => {
        try {
            const question = await QUESTION.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                question: req.body.question,
            });
            if (question) {
                res.status(201).json({
                    success: true,
                    question,
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
            const questions = await QUESTION.find();
            if (questions) {
                res.status(200).json({
                    success: true,
                    questions,
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
            const question = await QUESTION.findById(req.params.id);
            if (question) {
                res.status(200).json({
                    question,
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
            const question = await QUESTION.findByIdAndDelete(req.params.id);
            if (question) {
                res.status(200).json({
                    message: "question Deleted"
                });
            } else {
                res.status(404).json({
                    message: "Not Found!"
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
            const question = await QUESTION.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                question: req.body.question,
            });
            if (question) {
                res.status(201).json({
                    question,
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
// .get("/search", async (req, res) => {
//     try {
//         console.log(req.params)
//         // const data = await ARTICLE.find()
//     } catch (error) {

//     }
// });

module.exports = question;
