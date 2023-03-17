require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const user = require("./router/router");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB(process.env.MONGODB_URI);

app.use("/api", user);

app.listen(5000);
