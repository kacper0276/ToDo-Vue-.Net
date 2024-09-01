import type { ToDoGroup } from "./ToDoGroup.type";

export class ToDoItem {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public isComplete: boolean,
    public toDoGroupId: number,
    public toDoGroup?: ToDoGroup
  ) {}
}
