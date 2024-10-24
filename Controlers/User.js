const express = require("express");
const jwt = require("jsonwebtoken");
const USER = require("../Models/User.js");
const bcrypt = require("bcrypt");
const isAuth = require("../Utils/Auth.js");
const router = express.Router();
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    if (await USER.findOne({ email })) {
      res.status(401).json({
        message: "user already exist",
      });
    } else {
      const password = await bcrypt.hash(req.body.password, 15);
      const createUser = await USER.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: password,
      });

      const token = jwt.sign({ id: createUser._id }, "jamia");
      const options = {
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
      };

      res.status(201).cookie("token", token, options).json({
        message: "User created",
        seccess: true,
        createUser,
      });
    }
  } catch (error) {
    console.log({ message: error.message });
  }
});

// ///// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USER.findOne({ email: email }).select("+password");
    const passVerify = await user?.comparePassword(password);
    if (!user || !passVerify) {
      res
        .status(400)
        .json({ message: "inValid data or email already exists1" });
    } else {
      const token = jwt.sign({ id: user?._id }, "jamia");
      res
        .status(201)
        .cookie("token", token, {
          expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({
          message: "User logged in",
          seccess: true,
          user,
        });
    }
  } catch (error) {
    console.log({ message: error });
  }
});

/// logout user
router.get("/logout", isAuth, async (req, res) => {
  try {
    const user = await USER.findOne(req.user);
    console.log(user);
    if (user) {
      res
        .status(200)
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
          secure: false,
        })
        .json({
          message: "user logged out",
        });
    } else {
      res.status(401).json({
        message: "Not found!",
      });
    }
  } catch (error) {
    console.log({ message: error.message });
  }
});

// ///// logout user
router
  .get("/getuser", isAuth, async (req, res) => {
    try {
      const user = await USER.findById(req.user);
      if (!user) {
        res.status(401).json({
          message: "User not found!",
        });
      }

      res.status(200).json({
        message: "User Got",
        user,
      });
    } catch (error) {
      console.log({ message: error.message });
    }
  })
  .patch("/user/changepassword", isAuth, async (req, res) => {
    const { password, newpassword, confirmpassword } = req.body;
    console.log(req.body);
    try {
      const user = await USER.findOne(req.user);
      const passVerify = await user.comparePassword(password);
      if (newpassword != confirmpassword || !passVerify) {
        res.status(403).json({
          message: "confirmpassword is incorrect 5555",
        });
      } else {
        const passwordhashed = await bcrypt.hash(newpassword, 12);
        user.password = passwordhashed;
        await user.save();
        console.log(passwordhashed);
        res.status(201).json({
          message: "Password change",
          user,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .patch("/changerole", isAuth, async (req, res) => {
    const { email, key, role, phone } = req.body;
    console.log(req.body);
    try {
      if (key == "naeem") {
        const user = await USER.findOne({ email });
        user.role = role;
        await user.save();
        res.status(200).json({
          message: "role changed",
        });
      } else {
        res.status(401).json({
          message: "unauthorize user!",
        });
      }
    } catch (error) {}
  })
  .post("/forgetpassword", async (req, res) => {
    const { email } = req.body;
    console.log(req.body.email);
    try {
      const user = await USER.findOne({ email: email });
      if (!user) {
        res.status(404).json({ message: "not found" });
      } else {
        res.status(200).json({
          message: "found",
          user,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = router;
