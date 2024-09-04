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
  }
}
