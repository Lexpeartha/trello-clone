import { createStore } from "vuex";

import defaultBoard from "../default-board";
import { saveStatePlugin } from "../utils";

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

const store = createStore({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {},
  actions: {},
  modules: {}
});

export default store;
