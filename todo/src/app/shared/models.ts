/** TaskModel */
export interface TaskModel {
  /** TaskModelId (int) */
  id: number;
  /** Title (string) */
  title: string;
  /** IsDone (boolean) */
  isDone: boolean;
  /** TodoModelId (int) */
  todoId: number;
}

/** TodoModel */
export interface TodoModel {
  /** TodoModelId (int) */
  id: number;
  /** Title (string) */
  title: string;
  /** CreatedAt (Date) */
  createdAt: Date;
  /** EditedAt (Date) */
  editedAt: Date;
}

/** TodoViewModel */
export interface TodoViewModel {
  /** TodoViewModelId (int) */
  id: number;
  /** Title (string) */
  title: string;
  /** CreatedAt (Date) */
  createdAt: Date;
  /** EditedAt (Date) */
  editedAt: Date;
  /** Tasks (TaskModel[]) */
  tasks: TaskModel[] | undefined;
}
