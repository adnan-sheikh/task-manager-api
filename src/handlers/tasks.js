let { db, id } = require("../db");

function getTaskById(id) {
  return db.tasks.find((task) => task.id == id);
}

function getAllTasks() {
  return db.tasks;
}

function createNewTask(taskDetails) {
  const newTask = { id: id++, ...taskDetails };
  db.tasks.push(newTask);
  return newTask;
}

function updateTask(newTaskDetails) {
  const taskId = +newTaskDetails.id;
  const oldTaskDetails = getTaskById(taskId);
  if (!oldTaskDetails) {
    return null;
  }
  const updatedTask = { ...newTaskDetails, id: taskId };
  db.tasks = db.tasks.map((task) => {
    if (task.id == taskId) {
      return updatedTask;
    }
    return task;
  });
  return updatedTask;
}

function deleteTaskById(id) {
  const taskExists = getTaskById(id);
  if (!taskExists) {
    return null;
  }
  db.tasks = db.tasks.filter((task) => task.id != id);
  return db.tasks;
}

module.exports = {
  getTaskById,
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTaskById,
};
