import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import AppButton from "@/components/AppButton.vue";

const app = createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

app.component("AppButton", AppButton);
