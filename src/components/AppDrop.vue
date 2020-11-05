<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent="$event.preventDefault()"
    @dragenter.prevent="$event.preventDefault()"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrop",
  emits: ["drop"],
  methods: {
    onDrop(event) {
      const transferData = JSON.parse(event.dataTransfer.getData("payload"));

      this.$emit("drop", transferData);
    }
  }
};
</script>

<style scoped></style>
