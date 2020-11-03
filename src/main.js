import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import AppButton from "@/components/AppButton.vue";

const app = createApp(App)
  .component("AppButton", AppButton)
  .use(store)
  .use(router)
  .mount("#app");

export default app;
