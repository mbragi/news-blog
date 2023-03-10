const { Schema, model } = require("mongoose");

const feedback = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = { Feedback: model("feedback", feedback) };
