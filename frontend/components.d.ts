import "@vue/runtime-core";

export {};

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ToDoItem: typeof import("./src/components/todo/ToDoItem.vue")["default"];
    AddTodoModal: typeof import("./src/components/modals/AddTodoModal.vue")["default"];
    LoadingSpinner: typeof import("./src/components/ui/LoadingSpinner.vue")["default"];
    LoginForm: typeof import("./src/components/forms/LoginForm.vue")["default"];
    RegisterForm: typeof import("./src/components/forms/RegisterForm.vue")["default"];
    ChatComponent: typeof import("./src/components/chat/ChatComponent.vue")["default"];
    UserToDoGroup: typeof import("./src/components/todo/UserToDoGroup.vue")["default"];
    AddNewToDosGroupForm: typeof import("./src/components/forms/AddNewToDosGroupForm.vue")["default"];
    ChangeUserDataForm: typeof import("./src/components/forms/ChangeUserDataForm.vue")["default"];
    UserPanelNavigation: typeof import("./src/components/nav/UserPanelNavigation.vue")["default"];
    ChangeAdminDataForm: typeof import("./src/components/forms/ChangeAdminDataForm.vue")["default"];
    AdminPanelNavigation: typeof import("./src/components/nav/AdminPanelNavigation.vue")["default"];
    ChangeToDoGroupDataForm: typeof import("./src/components/forms/ChangeToDoGroupDataForm.vue")["default"];
    UserData: typeof import("./src/components/admin/UserData.vue")["default"];
    DisplayUsersList: typeof import("./src/components/admin/DisplayUsersList.vue")["default"];
  }
}
