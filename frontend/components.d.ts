import "@vue/runtime-core";

export {};

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ToDoItem: typeof import("./src/components/ToDoItem.vue")["default"];
  }
}
