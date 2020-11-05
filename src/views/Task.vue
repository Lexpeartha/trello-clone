<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div class="flex items-center w-full">
        <input
          :value="task.name"
          @change="updateTaskInfo($event, 'name')"
          @keyup.enter="updateTaskInfo($event, 'name')"
          class="p-2 mr-2 text-xl flex-grow font-bold"
          type="text"
        />
        <box-icon
          id="trash"
          color="#2c3e50"
          @click="removeTask()"
          name="trash"
        />
      </div>
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

export default {
  name: "Task",
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
    },
    removeTask() {
      this.$store.dispatch("removeTask", {
        task: this.task
      });
      this.$router.push({ name: "Board" });
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
