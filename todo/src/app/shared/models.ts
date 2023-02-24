
/** TodoModel */
export interface TaskModel {
  /** TodoModelId (int) */
  id: number;
  /** Title (string) */
  title: string;
  /** IsDone (boolean) */
  isDone: boolean;
  /** TodoWidgetsModelId (int) */
  todoId: number;
}

/** TodoWidgetsModelId */
export interface TodoModel {
  /** TodoWidgetsModelId (int) */
  id: number;
  /** Title (string) */
  title: string;
  /** CreatedAt (Date) */
  createdAt: Date;
  /** EditedAt (Date) */
  editedAt: Date;
}

export interface TodoViewModel {
  /** TodoWidgetsModelId (int) */
  id: number;
  /** Title (string) */
  title: string;
  /** CreatedAt (Date) */
  createdAt: Date;
  /** EditedAt (Date) */
  editedAt: Date;
  /** Todos (TaskModel[]) */
  tasks: TaskModel[] | undefined;
}
