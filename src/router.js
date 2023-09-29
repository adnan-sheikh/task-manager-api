const express = require("express");
const {
  getAllTasks,
  createNewTask,
  getTaskById,
  updateTask,
  deleteTaskById,
  getFilteredTasks,
} = require("./handlers/tasks");
const { validateTaskInput } = require("./middlewares/validateTaskInput");

const router = express.Router();

router.get("/tasks", getFilteredTasks, getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", validateTaskInput, createNewTask);
router.put("/tasks/:id", validateTaskInput, updateTask);
router.delete("/tasks/:id", deleteTaskById);

module.exports = { router };
