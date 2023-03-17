// require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// const db = "mongodb://127.0.0.1:27017/somedb";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
