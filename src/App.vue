<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import "./assets/tailwind.css";

body,
html {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#trash {
  cursor: pointer;
}
.container {
  @apply mx-auto;
}
</style>
