import { createStore } from "vuex";

import defaultBoard from "../default-board";
import { generateUid, saveStatePlugin } from "../utils";

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

const store = createStore({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask(state) {
      return uid => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            console.log("Searching tasks...");
            if (task.id == uid) {
              return task;
            }
          }
        }
      };
    }
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: generateUid(),
        description: ""
      });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];

      columnList.splice(toColumnIndex, 0, columnToMove);
    }
  },
  actions: {
    createNewTask({ commit }, { tasks, name }) {
      commit("CREATE_TASK", {
        tasks,
        name
      });
    },
    createNewColumn({ commit }, { name }) {
      commit("CREATE_COLUMN", {
        name
      });
    },
    updateTask({ commit }, { task, key, value }) {
      commit("UPDATE_TASK", {
        task,
        key,
        value
      });
    },
    moveTask({ commit }, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      commit("MOVE_TASK", {
        fromTasks,
        toTasks,
        toTaskIndex,
        fromTaskIndex
      });
    },
    moveColumn({ commit }, { fromColumnIndex, toColumnIndex }) {
      commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex
      });
    }
  },
  modules: {}
});

export default store;
