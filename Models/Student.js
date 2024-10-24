const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  admissionNumber: { type: Number, required: [true, "inValid"] },
  name: {
    type: String,
    required: [true, "inValid"],
  },
  cnicNumber: { type: Number, required: [true, "inValid"] },
  guiderName: { type: String, required: [true, "inValid"] },
  gCnic: { type: Number, required: [true, "inValid"] },
  previosClass: { type: String, required: [true, "inValid"] },
  newClass: { type: String, required: [true, "inValid"] },
  phone: { type: Number, required: [true, "inValid"] },
  situation: { type: String, required: [true, "inValid"] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("STUDENT", studentSchema);
