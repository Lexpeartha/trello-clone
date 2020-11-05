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
            if (task.id == uid) {
              return task;
            }
          }
        }
      };
    },
    getTaskData(state) {
      return task => {
        /*
        for (const column of state.board.columns) {
          column.tasks.forEach((t, tIndex) => {
            if (task.id === t.id)
              return {
                column,
                taskIndex: tIndex
              };
          });
        } */

        // This is actually really bad way to find task data needed, but other solutions
        // I came up with didn't work, and for now this is going to stay the way
        // we retrieve needed data about task
        const columns = state.board.columns;
        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
          for (
            let taskIndex = 0;
            taskIndex < columns[columnIndex].tasks.length;
            taskIndex++
          ) {
            if (columns[columnIndex].tasks[taskIndex].id == task.id) {
              return {
                columnIndex,
                taskIndex
              };
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
    },
    REMOVE_TASK(state, { columnIndex, taskIndex }) {
      state.board.columns[columnIndex].tasks.splice(taskIndex, 1);
    },
    REMOVE_COLUMN(state, { columnIndex }) {
      state.board.columns.splice(columnIndex, 1);
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
    },
    removeColumn({ commit }, { columnIndex }) {
      commit("REMOVE_COLUMN", {
        columnIndex
      });
    },
    removeTask({ commit, getters }, { task }) {
      let taskData = getters.getTaskData(task);

      commit("REMOVE_TASK", {
        columnIndex: taskData.columnIndex,
        taskIndex: taskData.taskIndex
      });
    }
  },
  modules: {}
});

export default store;
