<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        :value="task.name"
        @change="updateTaskInfo($event, 'name')"
        @keyup.enter="updateTaskInfo($event, 'name')"
        class="w-full p-2 mr-2 text-xl flex-grow font-bold"
        type="text"
      />
      <textarea
        class="w-full bg-transparent px-2 border mt-2 h-64 leading-normal border-none"
        :value="task.description"
        @change="updateTaskInfo($event, 'description')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin.js";

export default {
  name: "Task",
  mixins: [movingTasksAndColumnsMixin],
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  methods: {
    updateTaskInfo(event, key) {
      this.$store.dispatch("updateTask", {
        task: this.task,
        key,
        value: event.target.value
      });
    }
  }
};
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
