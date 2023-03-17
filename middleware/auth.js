require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", ""); // some token need to out bearer in front, this line removes the need for the bearer

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;  // decoded on the left when console log will return payload
      next();
    } catch (error) {
      return res.status(401).send({
        status: "error",
        message: "unauthorised",
      });
    }
  } else {
    return res.status(403).json({
      status: "error",
      message: "missing token",
    });
  }
};

module.exports = auth;
