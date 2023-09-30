# Task Manager API

A RESTful API for a task manager application using Node.js, and Express.js. This API will allow users to perform CRUD operations on tasks, with exciting features like filtering, sorting, and priority levels.

## Project Description

### Setup

1. Clone this repository.
2. Run `npm install` to install the necessary packages.
3. Run `npm start` to start the localhost server, on PORT:3000

### API Versions

`/api/v1`: Original API with base features.
`/api/v2`: Enhanced API with filtering, sorting, and priority level features.

### Endpoints (all v2 counterparts also exists)

- GET `/api/v1/tasks`: Retrieve all tasks.
- GET `/api/v1/tasks/:id`: Retrieve a single task by its ID.
- POST `/api/v1/tasks`: Create a new task.
- PUT `/api/v1/tasks/:id`: Update an existing task by its ID.
- DELETE `/api/v1/tasks/:id`: Delete a task by its ID.

### Database

Database is an in-memory database in code itself. It is pre-populated with some fields.

### Input Validation and Error Handling

When invalid input is provided during the creation or update of a task, the API responds with a status code of 400, indicating a Bad Request. The response includes a structured JSON body containing error details. Emptiness is checked for all the fields. Rest is as shown below:

```json
{
  "code": 1024,
  "message": "Validation Failed",
  "errors": [
    {
      "code": 4001,
      "field": "title",
      "message": "Title cannot be empty"
    },
    {
      "code": 4010,
      "field": "completed",
      "message": "Completed must be a boolean value"
    },
    {
      "code": 4011,
      "field": "priority",
      "message": "Priority should be either 'low', 'medium', or 'high'. Values are case sensitive."
    }
  ]
}
```

Other errors apart from Validation are laid out in JSON as follows. Following is an example when user tries to GET `/tasks/:id` with an invalid ID, status code: 400:

```json
{
  "code": 4040,
  "message": "No such task found",
  "description": "Please try getting a task with valid ID!"
}
```

Explanation:

- code: A unique identifier for the error response.
- message: A brief description of the error type.
- description: A detailed description necessary for the error type.
- errors: An array containing individual error objects.

  Error Object:

  - code: A specific error code.
  - field: The field in the request causing the error.
  - message: A detailed error message.

## Extensions (Available in v2 only)

### Filtering and Sorting (both as a query parameter)

When getting all the tasks using GET `/api/v2/tasks`, filtering and sorting can be applied

- Users can filter based on the `completed` property (true or false).
- Users can also filter based on `title_search`. It searches the `title` field based on the value of `title_search` property.
- Sort tasks by ascending or descending order using `created_at` and `title` keys (`sort`=`-created_at` for sorting based on Creation time of the task, but in descending order).
- Sort and Filters can be used together. Multiple filters are possible, but multiple sort is not.
  For example. GET `/api/v2/tasks?completed=false&title_search=api&sort=-created_at` meaning, GET all incomplete tasks, whose title includes the word `api` and sort the result by task creation date

### Priority Level

- Priority level ( `low` | `medium` | `high` ) is a required field in v2 for task creation and updates. This is case-sensitive, so any value other than listed in here, will respond with error.
- Retrieve tasks based on priority level using GET `/api/v2/tasks/priority/:level`.

## Migration from v1 to v2

- In order to upgrade your experience by using filtering, sorting and priority level features, update your API calls to use `/api/v2` instead of `/api/v1`.
- Ensure that `priority` is included when creating or modifying tasks in v2, with the value being `low` | `medium` | `high`.

PS: Apart from the API itself, static pages are served too. So, go to index page, i.e `/` route in the browser and you can see it from there, that you can do all the CRUD operations. UI is not meant to be beautiful, but workable. It uses v1 API for testing purposes. You can use Postman or integrated into VS Code, Thunder Client for API testing
