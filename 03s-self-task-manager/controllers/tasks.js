const Tasks = require("../models/tasks");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    if (!tasks) {
      return res.status(404).json({ success: false, msg: "no tasks found" });
    } else {
      return res.status(200).json({ tasks });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = req.body;
    await Tasks.create(newTask);
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
  return res.send("create task");
};

const getSingleTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findOne({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `no task found with id ${taskId}` });
    } else {
      return res.status(200).json(task);
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `no task found with id ${taskId}` });
    } else {
      return res.status(200).json(task);
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `no task found with id ${taskId}` });
    } else {
      return res.status(200).json(task);
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
