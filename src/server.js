const express = require("express");
const { router } = require("./router");

const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get("/", (req, res) => {
  const indexFilePath = path.resolve("src", "pages", "index.html");
  res.status(200).sendFile(indexFilePath);
});

app.get("/get-all-tasks", (req, res) => {
  const getAllTasksFilePath = path.resolve(
    "src",
    "pages",
    "get-all-tasks.html"
  );
  res.status(200).sendFile(getAllTasksFilePath);
});

app.get("/get-task", (req, res) => {
  const getTaskFilePath = path.resolve("src", "pages", "get-a-task.html");
  res.status(200).sendFile(getTaskFilePath);
});

app.get("/create-task", (req, res) => {
  const createTaskFilePath = path.resolve("src", "pages", "create-task.html");
  res.status(200).sendFile(createTaskFilePath);
});

app.get("/update-task", (req, res) => {
  const updateTaskFilePath = path.resolve("src", "pages", "update-task.html");
  res.status(200).sendFile(updateTaskFilePath);
});

app.get("/delete-task", (req, res) => {
  const deleteTaskFilePath = path.resolve("src", "pages", "delete-task.html");
  res.status(200).sendFile(deleteTaskFilePath);
});

module.exports = { app };
