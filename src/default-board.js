import { generateUid } from "./utils";

export default {
  name: "Trello Workshop Clone",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          description: "",
          name: "first task",
          id: generateUid(),
          userAssigned: null
        },
        {
          description: "",
          name: "second task",
          id: generateUid(),
          userAssigned: null
        },
        {
          description: "",
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
