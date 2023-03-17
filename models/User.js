const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    hash: { type: String },
    title: { type: String },
    with: { type: String },
    location: { type: String },
    date: { type: Date },
    start: { type: String },
    end: { type: String },
    category: { type: String },
  },
  { collection: "homework" }
);

module.exports = mongoose.model("User", UserSchema);
