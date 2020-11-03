<template>
  <div class="task-view"></div>
</template>

<script>
export default {
  name: "Task"
};
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
