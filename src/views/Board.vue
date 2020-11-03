<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        draggable="true"
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragstart.self="pickupColumn($event, $columnIndex)"
        @dragover.prevent="$event.preventDefault()"
        @dragenter.prevent="$event.preventDefault()"
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex"
      >
        <div class="flex-center items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            @click="goToTask(task)"
            draggable="true"
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            class="task"
            :key="$taskIndex"
            v-for="(task, $taskIndex) in column.tasks"
          >
            <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>
            <p
              v-if="task.description"
              class="w-full mt-1 flex-shrink-0 text-sm"
            >
              {{ task.description }}
            </p>
          </div>
        </div>

        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          @keyup.enter="createTask($event, column.tasks)"
          placeholder="+ Enter new task"
        />
      </div>
    </div>

    <div
      class="task-bg"
      @click.self="close"
      @keyup.esc="close"
      :tabindex="this.$route.params.id"
      v-if="isTaskOpen"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
/*  JAVASCRIPT FOR BOARD VIEW  */
import { mapState } from "vuex";

export default {
  name: "Board",
  computed: {
    /* Computed for telling us whether or not task model should be open,
    by checking if the route points to the route used for showing task */
    isTaskOpen() {
      return this.$route.name === "Task";
    },
    ...mapState(["board"])
  },
  methods: {
    /* Navigates router to the route for a task with specific ID */
    goToTask(task) {
      this.$router.push({ name: "Task", params: { id: task.id } });
    },
    /* Navigates router back to the board */
    close() {
      this.$router.push({ name: "Board" });
    },
    /* Edge case function, that closes the task modal when ESC is pressed
    (implemented for accessability & learning reasons) */
    closeByEsc(event) {
      if (event.which == 27) this.close();
    },
    /* Dispatches an action that creates a new task from the inputted name,
    and resets field's value to empty afterwards */
    createTask(event, tasksList) {
      this.$store.dispatch("createNewTask", {
        tasks: tasksList,
        name: event.target.value
      });
      event.target.value = "";
    },
    /* Method that initializes the proccess of dragging a task, first it
    sets it's effects to "move", and then it gives data to the event object
    needed later down the dragging proccess */
    pickupTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("task-index", taskIndex);
      event.dataTransfer.setData("from-column-index", fromColumnIndex);
      event.dataTransfer.setData("type", "task");
    },
    /* Same as for the method above, except this one is for columns specifically */
    pickupColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("from-column-index", fromColumnIndex);
      event.dataTransfer.setData("type", "column");
    },
    /* Method that recognizes what object is being dragged (task or column),
    and executes code for moving that object off of that */
    moveTaskOrColumn(event, toTasks, toColumnIndex) {
      const type = event.dataTransfer.getData("type");
      switch (type) {
        case "task": {
          /* Extracts info so that we can feed it into the action, so vuex
          can remove task from the column we dragged it from, and add it to
          desired column */
          let fromColumnIndex = event.dataTransfer.getData("from-column-index");
          let fromTasks = this.board.columns[fromColumnIndex].tasks;
          let taskIndex = event.dataTransfer.getData("task-index");

          this.$store.dispatch("moveTask", {
            fromTasks,
            toTasks,
            taskIndex
          });
          break;
        }
        case "column": {
          /* Gets column index, and dispatches action to move column to desired place */
          let fromColumnIndex = event.dataTransfer.getData("from-column-index");

          this.$store.dispatch("moveColumn", {
            fromColumnIndex,
            toColumnIndex
          });
          break;
        }
        default: {
          break;
        }
      }
    }
  },
  watch: {
    /* Watcher that helps us close modal for task when it's open with ESC,
    while the modal is open, window is listening for ESC keyup event, and
    when it recieves it, this calls a closeByEsc method */
    isTaskOpen() {
      if (this.isTaskOpen === false)
        window.removeEventListener("keyup", this.closeByEsc);
      else window.addEventListener("keyup", this.closeByEsc);
    }
  }
};
</script>

<style scoped>
/*  STYLES FOR BOARD VIEW  */
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
.column {
  @apply bg-grey-light p-3 mr-5 text-left shadow rounded;
  min-width: 350px;
}
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}
.task-bg {
  @apply absolute top-0 left-0 h-screen w-screen;
  background: rgba(0, 0, 0, 0.5);
}
</style>
