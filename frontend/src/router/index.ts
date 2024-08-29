import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ToDoView from "@/views/ToDoView.vue";
import AdminPanelView from "@/views/AdminPanelView.vue";
import UserPanelView from "@/views/UserPanelView.vue";
import { authGuard } from "@/guards/authGuard";
import { adminGuard } from "@/guards/adminGuard";

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
      beforeEnter: [authGuard],
    },
    {
      path: "/admin-panel",
      name: "admin-panel",
      component: AdminPanelView,
      beforeEnter: [authGuard, adminGuard],
    },
    {
      path: "/user-panel",
      name: "user-panel",
      component: UserPanelView,
      beforeEnter: [authGuard],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
