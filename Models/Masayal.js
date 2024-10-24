const mongoose = require("mongoose");
const masayalSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "inValid"]
    },
    answer: {
        type: String,
        required: [true, "inValid"]
    },
    date: {
        type: Date,
        default: Date.now

    }
});

module.exports = new mongoose.model("MASAYAL", masayalSchema);
