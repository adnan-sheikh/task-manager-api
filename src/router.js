const express = require("express");
const {
  getAllTasks,
  createNewTask,
  getTaskById,
  updateTask,
  deleteTaskById,
} = require("./handlers/tasks");

const router = express.Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createNewTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTaskById);

module.exports = { router };
