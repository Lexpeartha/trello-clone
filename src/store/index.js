import { createStore } from "vuex";
import defaultBoard from "../default-board";

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

const store = createStore({
  state: {
    board
  },
  mutations: {},
  actions: {},
  modules: {}
});

export default store;
