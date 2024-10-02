import "@vue/runtime-core";

export {};

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ToDoItem: typeof import("./src/components/todo/ToDoItem.vue")["default"];
    AddTodoModal: typeof import("./src/components/modals/AddTodoModal.vue")["default"];
    LoadingSpinner: typeof import("./src/components/ui/LoadingSpinner.vue")["default"];
    LoginForm: typeof import("./src/components/auth/LoginForm.vue")["default"];
    RegisterForm: typeof import("./src/components/auth/RegisterForm.vue")["default"];
    ChatComponent: typeof import("./src/components/chat/ChatComponent.vue")["default"];
    UserToDoGroup: typeof import("./src/components/todoGroup/UserToDoGroup.vue")["default"];
    AddNewToDosGroupForm: typeof import("./src/components/todoGroup/AddNewToDosGroupForm.vue")["default"];
    ChangeUserDataForm: typeof import("./src/components/user/ChangeUserDataForm.vue")["default"];
    UserPanelNavigation: typeof import("./src/components/nav/UserPanelNavigation.vue")["default"];
    ChangeAdminDataForm: typeof import("./src/components/admin/ChangeAdminDataForm.vue")["default"];
    AdminPanelNavigation: typeof import("./src/components/nav/AdminPanelNavigation.vue")["default"];
    ChangeToDoGroupDataForm: typeof import("./src/components/todoGroup/ChangeToDoGroupDataForm.vue")["default"];
    UserCard: typeof import("./src/components/admin/UserCard.vue")["default"];
    DisplayUsersList: typeof import("./src/components/admin/DisplayUsersList.vue")["default"];
    DisplayAllGroups: typeof import("./src/components/admin/DisplayAllGroups.vue")["default"];
    DisplayUserGroups: typeof import("./src/components/user/DisplayUserGroups.vue")["default"];
  }
}
