const router = require("./Controlers/User.js");
const student = require("./Controlers/Student.js");
const teacher = require("./Controlers/Teacher.js");
const articles = require("./Controlers/Article.js");
const Database = require("./Database/db.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const question = require("./Controlers/Question.js");
const Masayal = require("./Controlers/Masayal.js");
const dashboard = require("./Controlers/DashBoardData.js");
const contact = require("./Controlers/ContactForm.js");
const chating = require("./Controlers/Chating.js");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const app = express();

Database();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://haqania.vercel.app",
    credentials: true,
  })
);
app.use("/", router);
app.use("/student", student);
app.use("/teacher", teacher);
app.use("/articles", articles);
app.use("/masayals", Masayal);
app.use("/questions", question);
app.use("/dash", dashboard);
app.use("/contact", contact);
app.use("/chat", chating);
////////////server
app.listen(4400, () => {
  console.log("Server is running at 4400");
});
