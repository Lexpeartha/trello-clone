<template>
  <div class="board">
    <h1 class="text-3xl text-justify text-red-lighter bold mb-2 ">
      {{ board.name }}
    </h1>
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex"
        :column="column"
        :column-index="$columnIndex"
        :board="board"
      />
      <div class="column flex">
        <input
          type="text"
          placeholder="+ Enter new column"
          class="block p-2 w-full flex-grow bg-transparent"
          name="columnName"
          @keyup.enter="createColumn"
          v-model="newColumnName"
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
import TheColumn from "@/components/TheColumn.vue";

export default {
  name: "Board",
  data() {
    return {
      newColumnName: ""
    };
  },
  components: {
    BoardColumn: TheColumn
  },
  computed: {
    /* Computed for telling us whether or not task model should be open,
    by checking if the route points to the route used for showing task */
    isTaskOpen() {
      return this.$route.name === "Task";
    },
    ...mapState(["board"])
  },
  methods: {
    /* Navigates router back to the board */
    close() {
      this.$router.push({ name: "Board" });
    },
    /* Edge case function, that closes the task modal when ESC is pressed
    (implemented for accessability & learning reasons) */
    closeByEsc(event) {
      if (event.which == 27) this.close();
    },
    createColumn() {
      this.$store.dispatch("createNewColumn", {
        name: this.newColumnName
      });
      this.newColumnName = "";
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
