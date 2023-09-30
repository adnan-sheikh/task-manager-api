const express = require("express");
const { v1Router } = require("./api/v1/router");
const { v2Router } = require("./api/v2/router");
const { selectHTMLPage } = require("./handlers/pages");
const { customLogger } = require("./middlewares/customLogger");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger);

/**
 * API routes
 */
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

/**
 * Static pages
 */
app.get("/", selectHTMLPage("index"));
app.get("/get-all-tasks", selectHTMLPage("get-all-tasks"));
app.get("/get-task", selectHTMLPage("get-task"));
app.get("/create-task", selectHTMLPage("create-task"));
app.get("/update-task", selectHTMLPage("update-task"));
app.get("/delete-task", selectHTMLPage("delete-task"));

module.exports = { app };
