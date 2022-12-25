const router = require("express").Router();
let User = require("../models/record");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const role = req.body.role;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = new User({ name, role, email, password });
  newUser
    .save()
    .then(() => res.json("User " + name + " added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.name = req.body.name;
      user.role = req.body.role;
      user.email = req.body.email;
      user.password = req.body.password;
      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/findByEmail/:email").get((req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
