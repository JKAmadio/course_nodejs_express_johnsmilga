const mongoose = require("mongoose");

// we stablish a boilerplate to our schema (table)
// in this case, all task itens must (and only) have:
// name property with a String type
// completed property with a Boolean type
// mais infos: https://mongoosejs.com/docs/guide.html#schemas
const TaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

// we export a model based on the schema that we just setup
// mais infos: https://mongoosejs.com/docs/models.html
module.exports = mongoose.model("Task", TaskSchema);
