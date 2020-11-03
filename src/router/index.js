import { createRouter, createWebHistory } from "vue-router";
import Board from "@/views/Board.vue";
import Task from "@/views/Task.vue";

const routes = [
  {
    path: "/",
    name: "Board",
    component: Board,
    children: [
      {
        path: "/task/:id",
        name: "Task",
        component: Task
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
