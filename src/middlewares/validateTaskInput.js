function validateTaskInput(req, res, next) {
  const taskFromBody = req.body;
  const title = taskFromBody?.title;
  const description = taskFromBody?.description;
  const completed = taskFromBody?.completed;
  const error = {
    code: 1024,
    message: "Validation Failed",
    errors: [],
  };
  if (!title) {
    error.errors.push({
      code: 4001,
      field: "title",
      message: "Title cannot be empty",
    });
  }
  if (!description) {
    error.errors.push({
      code: 4002,
      field: "description",
      message: "Description cannot be empty",
    });
  }
  if (completed === "" || completed == null) {
    error.errors.push({
      code: 4003,
      field: "completed",
      message: "Completed cannot be empty",
    });
  } else if (typeof completed !== "boolean") {
    error.errors.push({
      code: 4010,
      field: "completed",
      message: "Completed should be a boolean",
    });
  }
  if (error.errors.length > 0) {
    return res.status(400).json(error);
  }
  next();
}

module.exports = { validateTaskInput };
