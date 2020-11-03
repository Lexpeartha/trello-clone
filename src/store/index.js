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
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(state, { fromTasks, toTasks, taskIndex }) {
      const taskToMove = fromTasks.splice(taskIndex, 1)[0];
      toTasks.push(taskToMove);
    }
  },
  actions: {
    createNewTask({ commit }, { tasks, name }) {
      commit("CREATE_TASK", {
        tasks,
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
    moveTask({ commit }, { fromTasks, toTasks, taskIndex }) {
      commit("MOVE_TASK", {
        fromTasks,
        toTasks,
        taskIndex
      });
    }
  },
  modules: {}
});

export default store;
