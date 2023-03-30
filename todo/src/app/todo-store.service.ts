import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskModel, TodoViewModel } from './shared/models';

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {

  constructor() { }

  private readonly _selectedTodos = new BehaviorSubject<TodoViewModel[]>([]);
  private readonly _selectedTasks = new BehaviorSubject<TaskModel[]>([]);

  public readonly todos$ = this._selectedTodos.asObservable();
  public readonly tasks$ = this._selectedTasks.asObservable();


  private get todos(): TodoViewModel[] {
    return this._selectedTodos.getValue();
  }

  private set todos(value: TodoViewModel[]) {
    this._selectedTodos.next(value);
  }

  private get tasks(): TaskModel[] {
    return this._selectedTasks.getValue();
  }

  private set tasks(value: TaskModel[]) {
    this._selectedTasks.next(value);
  }

  public updateSelectedTodos(todo: TodoViewModel): void {
    this.todos = [todo];

  }

  public updateSelectedTasks(task: TaskModel[]): void {
    this.tasks = [...task];

  }
}
