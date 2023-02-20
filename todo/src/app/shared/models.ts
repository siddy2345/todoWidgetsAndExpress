
/** TodoModel */
export interface TodoModel {
  /** TodoModelId (int) */
  id: number;
  /** Title (string) */
  title: string;
  /** IsDone (boolean) */
  isDone: boolean;
  /** TodoWidgetsModelId (int) */
  todoWidgetsModelId: number;
}

/** TodoWidgetsModelId */
export interface TodoWidgetsModel {
  /** TodoWidgetsModelId (int) */
  id: number;
  /** Title (string) */
  title: string;
  /** CreatedAt (Date) */
  createdAt: number;
  /** EditedAt (DAte) */
  editedAt: number;
  /** Todos (TodoModel[]) */
  todos: TodoModel[] | undefined;
}
