const mongoose = require("mongoose");

const Tasks = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "no name provided"],
    max: [20, "provide a name less than 20 characteres"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Tasks", Tasks);
