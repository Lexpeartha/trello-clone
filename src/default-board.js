import { generateUid } from "./utils";

export default {
  name: "Trello Workshop Clone",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          description: "First task description",
          name: "first task",
          id: generateUid(),
          userAssigned: null
        },
        {
          description: "Second task description",
          name: "second task",
          id: generateUid(),
          userAssigned: null
        },
        {
          description: "Third task description",
          name: "and thrid",
          id: generateUid(),
          userAssigned: null
        }
      ]
    },
    {
      name: "in-progress",
      tasks: [
        {
          description: "",
          name: "first task",
          id: generateUid(),
          userAssigned: null
        }
      ]
    },
    {
      name: "done",
      tasks: [
        {
          description: "",
          name: "first task",
          id: generateUid(),
          userAssigned: null
        }
      ]
    }
  ]
};
