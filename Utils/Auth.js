const USER = require("../Models/User.js");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const { token } = await req.cookies;
  if (!token) {
    res.status(401).json({
      message: "inValid Token for jwt",
    });
  }
  else {
    const decoded = jwt.verify(token, "jamia");
    req.user = await USER.findById(decoded.id);
    next();
  }

};

module.exports = isAuth;
