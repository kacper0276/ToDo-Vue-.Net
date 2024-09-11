import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import NotFoundView from "@/views/home/NotFoundView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import ToDoView from "@/views/todo/ToDoView.vue";
import AdminPanelView from "@/views/admin/AdminPanelView.vue";
import UserPanelView from "@/views/user/UserPanelView.vue";
import { authGuard } from "@/guards/authGuard";
import { adminGuard } from "@/guards/adminGuard";
import AddNewToDosGroupView from "@/views/todo/AddNewToDosGroupView.vue";
import UserProfileView from "@/views/user/UserProfileView.vue";
import UserToDosGroupView from "@/views/todo/UserToDosGroupView.vue";

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
      path: "/create-todos-group",
      name: "todo-gropu-create",
      component: AddNewToDosGroupView,
      beforeEnter: [authGuard],
    },
    {
      path: "/user-profile/:username",
      name: "user-profile",
      component: UserProfileView,
    },
    {
      path: "/your-todo-groups",
      name: "your-todo-groups",
      component: UserToDosGroupView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
