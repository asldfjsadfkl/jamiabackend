const nodemailer = require("nodemailer");
const sendMail = async (useremail, phone, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "esteban.grant@ethereal.email",
      pass: "3m9tgzXDQ45KtkNpA7",
    },
  });

  await transporter.sendMail({
    from: useremail,
    to: "mn45994445@gmail.com",
    subject: "testing",
    text: message,
  });
};
module.exports = sendMail;
