const router = require("express").Router();
let VolunteerRecord = require("../models/volunteer");

router.route("/").get((req, res) => {
  VolunteerRecord.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/:id").get((req, res) => {
  const userID = req.params.id;
  VolunteerRecord.findOne({ userID: userID })
    .then((list) => {
      res.json(list);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const volunteerRecord = req.body.volunteerRecord;
  const userID = req.body.userID;

  const newHours = new VolunteerRecord({
    userID: userID,
    volunteerRecord: volunteerRecord,
  });
  newHours
    .save()
    .then(() => res.json("New Volunteer Record added"))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/addItem").post((req, res) => {
  const userID = req.body.userID;
  const description = req.body.description;
  const date = req.body.date;
  const hours = req.body.hours;
  const approvedBy = "x";
  VolunteerRecord.updateOne(
    { userID: userID },
    {
      $push: {
        volunteerRecord: {
          description: description,
          date: date,
          hours: hours,
          approvedBy: approvedBy,
        },
      },
    }
  )
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/edit").post((req, res) => {
  const userID = req.body.userID;
  const description = req.body.description;
  const date = req.body.date;
  const hours = req.body.hours;
  const updatedID = req.body.updatedID;
  const approvedBy = req.body.approvedBy;
  VolunteerRecord.updateOne(
    { userID: userID, "volunteerRecord._id": updatedID },
    {
      $set: {
        "volunteerRecord.$.description": description,
        "volunteerRecord.$.date": date,
        "volunteerRecord.$.hours": hours,
        "volunteerRecord.$.approvedBy": approvedBy,
      },
    }
  )
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/delete").post((req, res) => {
  const userID = req.body.userID;
  const _id = req.body._id;

  VolunteerRecord.updateOne(
    { userID: userID },
    {
      $pull: { volunteerRecord: { _id: _id } },
    },
    {
      new: true,
    }
  )
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/getItem/:userID/:_id").get((req, res) => {
  const userID = req.params.userID;
  const _id = req.params._id;
  console.log(_id);
  VolunteerRecord.findOne({ userID: userID })
    .then((list) => {
      const val = list.volunteerRecord.find(
        (item) => item._id.toString() === _id
      );
      res.json(val);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
