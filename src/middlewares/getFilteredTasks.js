function getFilteredTasks(req, res, next) {
  const queryParams = req.query;
  const completedFilter = queryParams?.completed;
  if (completedFilter === "true" || completedFilter === "false") {
    const completed = completedFilter === "true";
    const filteredTasks = db.tasks.filter(
      (task) => task.completed === completed
    );
    if (filteredTasks.length === 0) {
      return res.status(404).json({
        message: "Tasks are empty! Try changing the filter!",
      });
    }
    return res.status(200).json(filteredTasks);
  }
  next();
}

module.exports = { getFilteredTasks };
