const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const seedData = require("../models/Seed");

// LOGIN
const login = async (req, res) => {
  try {
    const User = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "username does not exist" });
    }

    const result = await bcrypt.compare(req.body.password, specialUser.hash);

    if (!result) {
      return res
        .status(400)
        .json({ status: "error", message: "incorrect password" });
    }

    const payload = {
      id: specialUser._id,
      username: specialUser.username,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: uuidv4(),
    });
    const response = { access, refresh };

    res.json(response);
  } catch (error) {
    console.log("POST /users/refresh", error);
    res.status(401).json({ status: "error", message: "unauthorised" });
  }
};

// DISPLAY USER INFO
const getinfo = async (req, res) => {
  const info = await User.find();
  res.json(info);
};

// SEEDING INITIAL DATA
const seed = async (req, res) => {
  await User.deleteMany({});

  await User.create(seedData, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ status: "error", message: "seeding error" });
    } else {
      res.json({ status: "ok", message: "seeding successful" });
    }
  });
};

//CREATE NEW INFO
const createInfo = async (req, res) => {
  const newInfo = await User.create({
    title: req.body.title,
    with: req.body.with,
    location: req.body.location,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category,
  });

  console.log("created info is: ", newInfo);
  res.json({ status: "Okay", message: "New info created" });
};

//SEARCH INFO BY TITLE
const searchInfo = async (req, res) => {
  const info = await User.findOne({ title: req.body.title });
  res.json(info);
};

//SEARCH BY DATE

// const searchByDate = async (req, res) => {
//   const info = await User.find({ date: {$gte: req.body.from, $lt: req.body.till }});
//   res.json(info);
// };

const searchByDate = async (req, res) => {
  const appointmentDate = new Date(req.body.date);
  console.log(appointmentDate.getDate() + 4);
  appointmentDate.setDate(appointmentDate.getDate() + 4);
  console.log(appointmentDate);
  const info = await User.find({
    date: { $gte: req.body.date, $lt: appointmentDate },
  });
  res.json(info);
};

//UPDATE INFO
const updateInfo = async (req, res) => {
  const info = await User.updateOne(
    { title: req.body.title },
    {
      with: req.body.newWith,
      location: req.body.newLocation,
      date: req.body.newDate,
      start: req.body.newStart,
      end: req.body.newEnd,
      category: req.body.newCategory,
    }
  );
  console.log(info);
  res.json({ status: "ok", message: "updated" });
};

//DELETE INFO
const deleteInfo = async (req, res) => {
  const info = await User.deleteOne({ title: req.body.title });
  console.log(info);
  res.json({ status: "ok", message: "deleted" });
};

module.exports = {
  getinfo,
  seed,
  createInfo,
  searchInfo,
  updateInfo,
  deleteInfo,
  searchByDate,
};
