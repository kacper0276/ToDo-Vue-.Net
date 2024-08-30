import "@vue/runtime-core";

export {};

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ToDoItem: typeof import("./src/components/ToDoItem.vue")["default"];
    AddTodoModal: typeof import("./src/components/AddTodoModal.vue")["default"];
    LoadingSpinner: typeof import("./src/components/LoadingSpinner.vue")["default"];
    LoginForm: typeof import("./src/components/LoginForm.vue")["default"];
    RegisterForm: typeof import("./src/components/RegisterForm.vue")["default"];
    ChatComponent: typeof import("./src/components/ChatComponent.vue")["default"];
    UserToDoGroup: typeof import("./src/components/UserToDoGroup.vue")["default"];
  }
}
