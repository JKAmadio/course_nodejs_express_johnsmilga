const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: {
        values: ["interview", "declined", "pending"],
        message: "{VALUE} not suported",
      },
      default: "pending",
    },
    createdBy: {
      // creating a link between the User model and the Job model
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide User"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
