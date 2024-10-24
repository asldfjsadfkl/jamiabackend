const express = require("express");
const router = express.Router();
const sendMail = require("../Utils/sendMailer");

const contact = router.post("/contactform", (req, res) => {
  const { email, phone, message } = req.body;
  console.log(email, phone, message);

  
  try {
    sendMail(email, phone, message);
    res.status(201).json({ message: "Email sended" });
  } catch (error) {}
});
module.exports = contact;
