let uniqueId = 0;

const db = {
  tasks: [
    {
      id: uniqueId++,
      title: "Complete Module 1, Node js Intro",
      description:
        "Module 1 was missed last week. Try finishing it before the next session",
      completed: true,
    },
    {
      id: uniqueId++,
      title: "Complete Module 2, REST API and Express",
      description: "Assignments for Module 2 are pending. Need to finish that!",
      completed: false,
    },
  ],
};

module.exports = { db, uniqueId };
