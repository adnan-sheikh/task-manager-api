let uniqueId = 0;

const db = {
  tasks: [
    {
      id: uniqueId++,
      createdAt: Date.now() - 3000,
      title: "Complete Module 1, Node js Intro",
      description:
        "Module 1 was missed last week. Try finishing it before the next session",
      completed: true,
    },
    {
      id: uniqueId++,
      createdAt: Date.now() - 2000,
      title: "Complete Module 2, REST API and Express",
      description: "Assignments for Module 2 are pending. Need to finish that!",
      completed: false,
    },
    {
      id: uniqueId++,
      createdAt: Date.now() - 1000,
      title: "Revision for Module 1 and 2",
      description: "revise ASAP",
      completed: false,
    },
    {
      id: uniqueId++,
      createdAt: Date.now(),
      title: "Develop the Task Manager API",
      description: "Based on the question, complete this!",
      completed: false,
    },
  ],
};

module.exports = { db, uniqueId };
