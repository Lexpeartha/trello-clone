<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transfer-data="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex-center items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <BoardTask
          v-for="(task, $taskIndex) in column.tasks"
          :key="$taskIndex"
          :task="task"
          :task-index="$taskIndex"
          :board="board"
          :column="column"
          :column-index="columnIndex"
        />
      </div>

      <input
        type="text"
        class="block p-2 w-full bg-transparent"
        @keyup.enter="createTask($event, column.tasks)"
        placeholder="+ Enter new task"
      />
    </AppDrag>
  </AppDrop>
</template>

<script>
import TheTask from "@/components/TheTask.vue";
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin.js";

export default {
  name: "TheColumn",
  components: {
    BoardTask: TheTask,
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    /* Dispatches an action that creates a new task from the inputted name,
    and resets field's value to empty afterwards */
    createTask(event, tasksList) {
      this.$store.dispatch("createNewTask", {
        tasks: tasksList,
        name: event.target.value
      });
      event.target.value = "";
    },
    /* Same as for the method above, except this one is for columns specifically */
    pickupColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("from-column-index", fromColumnIndex);
      event.dataTransfer.setData("type", "column");
    }
  }
};
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
.column {
  @apply bg-red-lighter p-3 mr-5 text-left shadow rounded;
  min-width: 350px;
}
.board {
  @apply p-4 bg-red-dark h-full overflow-auto;
}
.task-bg {
  @apply absolute top-0 left-0 h-screen w-screen;
  background: rgba(0, 0, 0, 0.5);
}
::placeholder {
  color: rgb(61, 72, 82);
}
</style>
