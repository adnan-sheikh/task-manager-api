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

app.get("/tasks", (req, res) => {
  const allTasks = MemDb.getAllTasks();
  res.status(200).json(allTasks);
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Error starting the server!");
  }
  console.log(`Server started! Listening on port: ${PORT}`);
});
