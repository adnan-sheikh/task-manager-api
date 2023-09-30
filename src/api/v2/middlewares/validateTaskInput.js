const { isEmpty, isBoolean } = require("../../../utils");
const { PRIORITY_LEVEL } = require("../const");

function validateTaskInput(req, res, next) {
  const taskFromBody = req.body;
  const title = taskFromBody?.title;
  const description = taskFromBody?.description;
  const completed = taskFromBody?.completed;
  const priority = taskFromBody?.priority;
  const error = {
    code: 1024,
    message: "Validation Failed",
    errors: [],
  };
  if (isEmpty(title)) {
    error.errors.push({
      code: 4001,
      field: "title",
      message: "Title cannot be empty",
    });
  }
  if (isEmpty(description)) {
    error.errors.push({
      code: 4002,
      field: "description",
      message: "Description cannot be empty",
    });
  }
  if (isEmpty(completed)) {
    error.errors.push({
      code: 4003,
      field: "completed",
      message: "Completed cannot be empty",
    });
  } else if (!isBoolean(completed)) {
    error.errors.push({
      code: 4010,
      field: "completed",
      message: "Completed should be a boolean",
    });
  }
  if (isEmpty(priority)) {
    error.errors.push({
      code: 4004,
      field: "priority",
      message: "Priority cannot be empty",
    });
  } else if (!PRIORITY_LEVEL.includes(priority)) {
    error.errors.push({
      code: 4011,
      field: "priority",
      message: "Priority should be either `low`, `medium` or `high`. Values are case sensitive!",
    });
  }
  if (error.errors.length > 0) {
    return res.status(400).json(error);
  }
  next();
}

module.exports = { validateTaskInput };
