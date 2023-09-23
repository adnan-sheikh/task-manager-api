let id = 0;

const db = {
  tasks: [
    {
      id: id++,
      title: "Complete Module 1, Node js Intro",
      description:
        "Module 1 was missed last week. Try finishing it before the next session",
      completed: true,
    },
    {
      id: id++,
      title: "Complete Module 2, REST API and Express",
      description: "Assignments for Module 2 are pending. Need to finish that!",
      completed: false,
    },
  ],
};

class MemDb {
  static getTaskById(id) {
    return db.tasks.find((task) => task.id == id);
  }

  static getAllTasks() {
    return db.tasks;
  }

  static createNewTask(taskDetails) {
    const newTask = { id: id++, ...taskDetails };
    db.tasks.push(newTask);
    return newTask;
  }

  static updateTask(newTaskDetails) {
    const taskId = +newTaskDetails.id;
    const oldTaskDetails = this.getTaskById(taskId);
    if (!oldTaskDetails) {
      return null;
    }
    const updatedTask = { ...newTaskDetails, id: taskId };
    db.tasks = db.tasks.map((task) => {
      if (task.id == taskId) {
        return updatedTask;
      }
      return task;
    });
    return updatedTask;
  }

  static deleteTaskById(id) {
    const taskExists = this.getTaskById(id);
    if (!taskExists) {
      return null;
    }
    db.tasks = db.tasks.filter((task) => task.id != id);
    return db.tasks;
  }
}

module.exports = MemDb;
