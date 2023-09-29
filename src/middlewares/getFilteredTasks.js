const { db } = require("../db");
const { isEmpty } = require("../utils");

function getFilteredTasks(req, res, next) {
  const queryParams = req.query;
  const completedFilter = queryParams?.completed;
  const titleSearchQuery = queryParams?.title_search;
  let filteredTasks = null;

  if (completedFilter === "true" || completedFilter === "false") {
    const isTaskCompleted = completedFilter === "true";
    filteredTasks = db.tasks.filter(
      (task) => task.completed === isTaskCompleted
    );
  }

  if (!isEmpty(titleSearchQuery)) {
    filteredTasks = filteredTasks
      ? filteredTasks.filter((task) =>
          task.title.toLowerCase().includes(titleSearchQuery)
        )
      : db.tasks.filter((task) =>
          task.title.toLowerCase().includes(titleSearchQuery)
        );
  }

  if (filteredTasks?.length > 0) {
    return res.status(200).json(filteredTasks);
  } else if (filteredTasks?.length === 0) {
    return res.status(404).json({
      message: "Tasks are empty! Try changing the filter!",
    });
  }

  next();
}

module.exports = { getFilteredTasks };
