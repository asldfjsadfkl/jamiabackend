const mongoose = require("mongoose");

const Database = () => {
  try {
    mongoose.connect(`mongodb://127.0.0.1:27017/jamia`, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log({ message: error.message });
  }
};

module.exports = Database;
