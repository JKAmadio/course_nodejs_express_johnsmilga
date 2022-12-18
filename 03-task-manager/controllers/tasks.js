const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError, CustomAPIError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  return res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const newTask = await Task.create(req.body);
  return res.status(201).json(newTask);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const singleTask = await Task.findById(id);
  if (!singleTask) {
    // the same way ate async.js
    // this "next" will 'call' the error handler middleware
    return next(createCustomError(`No task with id: ${id}`, 404));
  } else {
    return res.status(200).json({ singleTask });
  }
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }
  return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }
  return res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
