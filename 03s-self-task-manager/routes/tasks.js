const express = require("express");
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const route = express.Router();

route.route("/").get(getAllTasks).post(createTask);
route.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = route;
