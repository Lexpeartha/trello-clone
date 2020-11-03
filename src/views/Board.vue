<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        :key="$columnIndex"
        @drop="moveTask($event, column.tasks)"
        @dragover.prevent="$event.preventDefault()"
        @dragenter.prevent="$event.preventDefault()"
        v-for="(column, $columnIndex) in board.columns"
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
import { mapState } from "vuex";

export default {
  name: "Board",
  computed: {
    isTaskOpen() {
      return this.$route.name === "Task";
    },
    ...mapState(["board"])
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "Task", params: { id: task.id } });
    },
    close() {
      this.$router.push({ name: "Board" });
    },
    closeByEsc(event) {
      if (event.which == 27) this.close();
    },
    createTask(event, tasksList) {
      this.$store.dispatch("createNewTask", {
        tasks: tasksList,
        name: event.target.value
      });
      event.target.value = "";
    },
    pickupTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("task-index", taskIndex);
      event.dataTransfer.setData("from-column-index", fromColumnIndex);
    },
    moveTask(event, toTasks) {
      let fromColumnIndex = event.dataTransfer.getData("from-column-index");
      let fromTasks = this.board.columns[fromColumnIndex].tasks;
      let taskIndex = event.dataTransfer.getData("task-index");


      this.$store.dispatch("moveTask", {
        fromTasks,
        toTasks,
        taskIndex
      });
    }
  },
  watch: {
    isTaskOpen() {
      if (this.isTaskOpen === false)
        window.removeEventListener("keyup", this.closeByEsc);
      else window.addEventListener("keyup", this.closeByEsc);
    }
  }
};
</script>

<style scoped>
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
