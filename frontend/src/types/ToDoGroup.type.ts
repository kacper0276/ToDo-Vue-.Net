import type { User } from "./Auth.type";
import type { ToDoItem } from "./ToDoItem.type";

export class ToDoGroup {
  constructor(
    public id: number,
    public name?: string,
    public description?: string,
    public visible: boolean = false,
    public userId?: number,
    public user?: User,
    public toDoItems: ToDoItem[] = []
  ) {}
}
