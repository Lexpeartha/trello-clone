<template>
  <div
    class="column"
    draggable="true"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragstart.self="pickupColumn($event, columnIndex)"
    @dragover.prevent="$event.preventDefault()"
    @dragenter.prevent="$event.preventDefault()"
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
  </div>
</template>

<script>
import TheTask from "@/components/TheTask.vue";

export default {
  name: "TheColumn",
  components: {
    BoardTask: TheTask
  },
  props: {
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
    /* Dispatches an action that creates a new task from the inputted name,
    and resets field's value to empty afterwards */
    createTask(event, tasksList) {
      this.$store.dispatch("createNewTask", {
        tasks: tasksList,
        name: event.target.value
      });
      event.target.value = "";
    },
    /* Method that recognizes what object is being dragged (task or column),
    and executes code for moving that object off of that */
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
