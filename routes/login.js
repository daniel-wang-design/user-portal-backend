const router = require("express").Router();
let User = require("../models/record");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.route("/").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userWithEmail = await User.findOne({ email: email }).catch((err) => {
    console.log("Error: ", err);
  });

  if (!userWithEmail) {
    return res.status(400).json("Wrong email or password.");
  }
  if (userWithEmail.password !== password) {
    return res.status(400).json("Wrong email or password.");
  }
  const jwtToken = jwt.sign(
    {
      email: userWithEmail.email,
    },
    process.env.JWT_SECRET
  );
  res.status(200).json({ token: jwtToken, objectID: userWithEmail._id });
});

module.exports = router;
