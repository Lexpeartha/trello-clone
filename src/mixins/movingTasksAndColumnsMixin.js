export default {
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
    }
  }
};
