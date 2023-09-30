const { db } = require("../../../db");
const { isEmpty } = require("../../../utils");

function getFilteredTasks(req, res, next) {
  const queryParams = req.query;
  const completedFilter = queryParams?.completed;
  const titleSearchQuery = queryParams?.title_search;
  const sortOrder = !isEmpty(queryParams?.sort)
    ? queryParams?.sort?.[0] === "-"
      ? "desc"
      : "asc"
    : null;
  const sortKeyFromClient =
    sortOrder === "desc" ? queryParams.sort.slice(1) : queryParams?.sort;
  const sortKey =
    sortKeyFromClient === "created_at" ? "createdAt" : sortKeyFromClient;

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

  if (!isEmpty(sortKey) && (sortKey === "createdAt" || sortKey === "title")) {
    filteredTasks = filteredTasks
      ? filteredTasks.sort(sortComparator(sortOrder, sortKey))
      : db.tasks.sort(sortComparator(sortOrder, sortKey));
  }

  if (filteredTasks?.length > 0) {
    return res.status(200).json(filteredTasks);
  } else if (filteredTasks?.length === 0) {
    return res.status(200).json([]);
  }

  next();
}

function sortComparator(sortOrder, sortKey) {
  return (a, b) => {
    if (sortOrder === "asc") {
      if (sortKey === "title") {
        return a[sortKey].localeCompare(b[sortKey]);
      }
      return a[sortKey] - b[sortKey];
    } else if (sortOrder === "desc") {
      if (sortKey === "title") {
        return b[sortKey].localeCompare(a[sortKey]);
      }
      return b[sortKey] - a[sortKey];
    }
    return 0;
  };
}

module.exports = { getFilteredTasks };
