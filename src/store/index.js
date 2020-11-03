import { createStore } from "vuex";

import defaultBoard from "../default-board";
import { saveStatePlugin } from "../utils";

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
  mutations: {},
  actions: {},
  modules: {}
});

export default store;
