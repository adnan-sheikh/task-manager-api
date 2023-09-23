const express = require("express");
const path = require("path");
const MemDb = require("./db");

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/tasks", (req, res) => {
  const allTasks = MemDb.getAllTasks();
  if (allTasks.length === 0) {
    return res.status(404).json({
      message: "Tasks are empty!",
    });
  }
  res.status(200).json(allTasks);
});

app.post("/tasks", (req, res) => {
  const newTask = req.body;
  const task = MemDb.createNewTask(newTask);
  res.status(200).json({ message: "Successfully created new task!", task });
});

app.get("/tasks/:id", (req, res) => {
  const task = MemDb.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({
      message: "No such task found. Please try getting a task with valid ID!",
    });
  }
  res.status(200).json({ ...task });
});

app.put("/tasks/:id", (req, res) => {
  const updatedTask = req.body;
  const task = MemDb.updateTask(updatedTask);
  if (!task) {
    return res.status(404).json({
      message:
        "No such task found. Please try updating a task with a valid ID!",
    });
  }
  res.status(200).json({ ...task });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Error starting the server!");
  }
  console.log(`Server started! Listening on port: ${PORT}`);
});
