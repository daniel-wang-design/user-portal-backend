const express = require("express");
const cors = require("cors");
const { application } = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfuly");
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const volunteerRouter = require("./routes/volunteerHours");
app.use("/volunteer", volunteerRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
