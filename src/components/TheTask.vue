<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      @click="goToTask(task)"
      :transfer-data="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
    >
      <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>
      <p v-if="task.description" class="w-full mt-1 flex-shrink-0 text-sm">
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin.js";

export default {
  name: "TheTask",
  mixins: [movingTasksAndColumnsMixin],
  components: {
    AppDrag,
    AppDrop
  },
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    /* Navigates router to the route for a task with specific ID */
    goToTask(task) {
      this.$router.push({ name: "Task", params: { id: task.id } });
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
