const Task = require("../models/Task");

// to garantee that we have an answer from the database, we use async/await method
// the mongoose model has a 'find' method that filters the documents based on some properties
// mais infos: https://mongoosejs.com/docs/api.html#model_Model-find
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
};

// to garantee that the item is created at the database, we use async/await method
// the mongoose model has a 'create' method that creates a documnent (the item of the table)
// mais infos: https://mongoosejs.com/docs/models.html#constructing-documents
const createTask = async (req, res) => {
  // as we are executing an await/async method we MUST
  // use the try/catch block so we can handdle any error
  try {
    const newTask = await Task.create(req.body);
    return res.status(201).json(newTask);
  } catch (error) {
    // "error" is the phrase that we put at the model schema (see file Taks.js)
    return res.status(500).json({ success: false, msg: error });
  }
};

// to garantee that we have an answer from the database, we use async/await method
// the mongoose model has a 'findId' method that filter the documents based on the Id property
// mais infos: https://mongoosejs.com/docs/api.html#model_Model-findById
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const singleTask = await Task.findById(id);

    // another way: with "findOne" method
    // mais infos: https://mongoosejs.com/docs/api.html#model_Model-findOne
    // const { id: taskId } = req.params;
    // const singleTask = await Task.findOne({ _id: taskId });

    // this conditional is very important because we have two types of errors
    // error 404 will be launched when no tasks were found
    if (!singleTask) {
      return res
        .status(404)
        .json({ success: false, msg: `No task with id: ${id}` });
    } else {
      return res.status(200).json({ singleTask });
    }
  } catch (error) {
    // error 500 will be launched when the info passed is not an ObjectId format
    return res.status(500).json({ success: false, msg: error });
  }
};

// to garantee that we have an answer from the database, we use async/await method
// the mongoose model has a 'findOneAndDelete' method that filters the documents based on some properties and updates it
// we MUST pass the object with the new infos (req.body in our case)
// we CAN pass some extra infos:
// new: will modify the "task" variable to the new value
// runValidators: will run the validators set on the schema (see Task.js)
// mais infos: https://mongoosejs.com/docs/api.html#model_Model-findOneAndUpdate
const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `no task with id ${taskId}` });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `No task with id ${taskId}` });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
