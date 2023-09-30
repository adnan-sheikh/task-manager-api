let { db, uniqueId } = require("../../../db");

function getAllTasks(req, res) {
  const allTasks = db.tasks;
  if (allTasks.length === 0) {
    return res.status(200).json([]);
  }
  res.status(200).json(allTasks);
}

function getTaskById(req, res) {
  const task = db.tasks.find((task) => task.id == req.params.id);
  if (!task) {
    return res.status(404).json({
      code: 4040,
      message: "No such task found",
      description: "Please try getting a task with valid ID!",
    });
  }
  res.status(200).json(task);
}

function createNewTask(req, res) {
  const taskFromBody = req.body;
  const { title, description, completed } = taskFromBody;
  const newTask = {
    id: uniqueId++,
    createdAt: Date.now(),
    title,
    description,
    completed,
  };
  db.tasks.push(newTask);
  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const newTaskDetails = req.body;
  const newTaskId = req.params.id;
  const oldTaskDetails = db.tasks.find((task) => task.id == newTaskId);
  if (!oldTaskDetails) {
    return res.status(404).json({
      code: 4040,
      message: "No such task found",
      description: "Please try updating a task with valid ID!",
    });
  }
  const taskId = +newTaskId;
  const { title, description, completed } = newTaskDetails;
  const updatedTask = {
    id: taskId,
    createdAt: oldTaskDetails.createdAt,
    title,
    description,
    completed,
  };
  db.tasks = db.tasks.map((task) => {
    if (task.id == taskId) {
      return updatedTask;
    }
    return task;
  });
  res.status(200).json(updatedTask);
}

function deleteTaskById(req, res) {
  const oldTaskDetails = db.tasks.find((task) => task.id == req.params.id);
  if (!oldTaskDetails) {
    return res.status(404).json({
      code: 4040,
      message: "No such task found",
      description: "Please try deleting a task with valid ID!",
    });
  }
  db.tasks = db.tasks.filter((task) => task.id != req.params.id);
  res.status(200).json({ message: "success" });
}

module.exports = {
  getTaskById,
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTaskById,
};
