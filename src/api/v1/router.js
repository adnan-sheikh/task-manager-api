const express = require("express");
const {
  getAllTasks,
  createNewTask,
  getTaskById,
  updateTask,
  deleteTaskById,
} = require("./handlers/tasks");
const { validateTaskInput } = require("./middlewares");

const router = express.Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", validateTaskInput, createNewTask);
router.put("/tasks/:id", validateTaskInput, updateTask);
router.delete("/tasks/:id", deleteTaskById);

module.exports = { v1Router: router };
