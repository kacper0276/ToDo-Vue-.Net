import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ToDoView from "@/views/ToDoView.vue";
import AdminPanelView from "@/views/AdminPanelView.vue";
import UserPanelView from "@/views/UserPanelView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/to-dos",
      name: "to-dos",
      component: ToDoView,
    },
    {
      path: "/admin-panel",
      name: "admin-panel",
      component: AdminPanelView,
    },
    {
      path: "/user-panel",
      name: "user-panel",
      component: UserPanelView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
