const express = require("express");
const { router: v1Router } = require("./api/v1/router");
const { selectHTMLPage } = require("./api/v1/handlers/pages");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * API routes
 */
app.use("/api/v1", v1Router);

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
