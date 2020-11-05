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
    moveTaskOrColumn(transferData /*, toTasks, toColumnIndex, toTaskIndex*/) {
      const type = transferData.type;

      if (type === "column") {
        this.moveColumn(transferData);
      } else if (type === "task") {
        this.moveTask(transferData);
      } else {
        console.log(
          "If you got this message in console, then you passed wrong type of the payload!"
        );
      }
    },
    moveTask({ fromColumnIndex, fromTaskIndex }) {
      let fromTasks = this.board.columns[fromColumnIndex].tasks;
      let toTasks = this.column.tasks;
      let toTaskIndex = this.taskIndex;

      this.$store.dispatch("moveTask", {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      });
    },
    moveColumn({ fromColumnIndex }) {
      this.$store.dispatch("moveColumn", {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      });
    }
  }
};
