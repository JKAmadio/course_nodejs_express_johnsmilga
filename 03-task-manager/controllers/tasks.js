const getAllTasks = (req, res) => {
  return res.send("Get all tasks");
};

const createTask = (req, res) => {
  const { name } = req.body;
  if (!name) return res.json({ success: false, msg: "no task passed" });
  else return res.json({ success: true, task: name });
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
