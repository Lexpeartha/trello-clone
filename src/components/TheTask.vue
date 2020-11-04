<template>
  <div
    @click="goToTask(task)"
    draggable="true"
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @dragover.prevent="$event.preventDefault()"
    @dragenter.prevent="$event.preventDefault()"
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
    class="task"
  >
    <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>
    <p v-if="task.description" class="w-full mt-1 flex-shrink-0 text-sm">
      {{ task.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TheTask",
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
    },
    /* Method that initializes the proccess of dragging a task, first it
    sets it's effects to "move", and then it gives data to the event object
    needed later down the dragging proccess */
    pickupTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("from-task-index", taskIndex);
      event.dataTransfer.setData("from-column-index", fromColumnIndex);
      event.dataTransfer.setData("type", "task");
    },
    moveTaskOrColumn(event, toTasks, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData("type");
      switch (type) {
        case "task": {
          this.moveTask(
            event,
            toTasks,
            /* Checks whether toTaskIndex is provided, if it isn't (that means it wasn't
            dragged directly onto another task) then it will add it to the end of column  */
            toTaskIndex !== undefined ? toTaskIndex : toTasks.length
          );
          break;
        }
        case "column": {
          this.moveColumn(event, toColumnIndex);
          break;
        }
        default: {
          /* This default case shouldn't ever be triggered, but leaving it here regardless */
          console.log(
            "If you got this message in console, then you did something wrong!"
          );
          break;
        }
      }
    },
    moveTask(event, toTasks, toTaskIndex) {
      /* Extracts info so that we can feed it into the action, so vuex
      can remove task from the column we dragged it from, and add it to
      desired column */
      let fromColumnIndex = event.dataTransfer.getData("from-column-index");
      let fromTasks = this.board.columns[fromColumnIndex].tasks;
      let fromTaskIndex = event.dataTransfer.getData("from-task-index");

      this.$store.dispatch("moveTask", {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      });
    },
    moveColumn(event, toColumnIndex) {
      /* Gets column index, and dispatches action to move column to desired place */
      let fromColumnIndex = event.dataTransfer.getData("from-column-index");

      this.$store.dispatch("moveColumn", {
        fromColumnIndex,
        toColumnIndex
      });
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
