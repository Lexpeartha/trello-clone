<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        :key="$columnIndex"
        v-for="(column, $columnIndex) in board.columns"
      >
        <div class="flex-center items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Board",
  computed: mapState(["board"])
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
  @apply absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
