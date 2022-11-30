const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  return res.send("Get all tasks");
};

// to garantee that the item is created at the database, we use async/await method
// the mongoose model has a 'create' method that creates a documnent (the item of the table)
// mais infos: https://mongoosejs.com/docs/models.html#constructing-documents
const createTask = async (req, res) => {
  const newTask = await Task.create(req.body);
  return res.status(201).json(newTask);
};

const getTask = (req, res) => {
  const { id } = req.params;
  return res.send(`Get task ${id}`);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.json({ success: false, msg: "no new value passed" });
  else return res.json({ success: true, task: name });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  return res.send(`Delete task ${id}`);
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
