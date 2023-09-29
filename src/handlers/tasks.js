let { db, uniqueId } = require("../db");

function getAllTasks(req, res) {
  const allTasks = db.tasks;
  if (allTasks.length === 0) {
    return res.status(404).json({
      message: "Tasks are empty! Create a new task to view!",
    });
  }
  res.status(200).json(allTasks);
}

function getTaskById(req, res) {
  const task = db.tasks.find((task) => task.id == req.params.id);
  if (!task) {
    return res.status(404).json({
      message: "No such task found. Please try getting a task with valid ID!",
    });
  }
  res.status(200).json({ ...task });
}

function createNewTask(req, res) {
  const taskFromBody = req.body;
  const newTask = { id: uniqueId++, ...taskFromBody, createdAt: Date.now() };
  db.tasks.push(newTask);
  res
    .status(201)
    .json({ message: "Successfully created new task!", task: newTask });
}

function updateTask(req, res) {
  const newTaskDetails = req.body;
  const oldTaskDetails = db.tasks.find((task) => task.id == req.params.id);
  if (!oldTaskDetails) {
    return res.status(404).json({
      message: "No such task found. Please try updating a task with valid ID!",
    });
  }
  const taskId = +newTaskDetails.id;
  const updatedTask = { ...newTaskDetails, id: taskId };
  db.tasks = db.tasks.map((task) => {
    if (task.id == taskId) {
      return updatedTask;
    }
    return task;
  });
  res.status(200).json({ ...updatedTask });
}

function deleteTaskById(req, res) {
  const oldTaskDetails = db.tasks.find((task) => task.id == req.params.id);
  if (!oldTaskDetails) {
    return res.status(404).json({
      message: "No such task found. Please try deleting a task with valid ID!",
    });
  }
  db.tasks = db.tasks.filter((task) => task.id != req.params.id);
  res.status(200).json({ message: "Successfully deleted the task!" });
}

module.exports = {
  getTaskById,
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTaskById,
};
