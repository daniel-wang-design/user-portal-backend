const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const volunteerSchema = new Schema(
  {
    volunteerRecord: [
      {
        description: {
          type: String,
          required: true,
          trim: true,
        },
        date: {
          type: Date,
          required: true,
          trim: true,
        },
        hours: {
          type: Number,
          required: true,
        },
        approvedBy: {
          type: String,
          required: true,
        },
      },
    ],
    userID: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const volunteerRecord = mongoose.model("VolunteerRecord", volunteerSchema);

module.exports = volunteerRecord;
