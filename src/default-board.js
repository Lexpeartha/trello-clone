import { generateUid } from "./utils";

export default {
  name: "Trello Workshop Clone",
  columns: [
    {
      name: "To-do column",
      tasks: [
        {
          description: "First to-do",
          name: "First task",
          id: generateUid(),
          userAssigned: null
        },
        {
          description: "Second to-do",
          name: "Second task",
          id: generateUid(),
          userAssigned: null
        },
        {
          description: "Third to-do",
          name: "Third task",
          id: generateUid(),
          userAssigned: null
        }
      ]
    },
    {
      name: "Currently doing",
      tasks: [
        {
          description: "Web development seems so interesting!",
          name: "Learning web development",
          id: generateUid(),
          userAssigned: null
        }
      ]
    },
    {
      name: "Done",
      tasks: []
    }
  ]
};
