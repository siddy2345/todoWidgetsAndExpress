import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoViewModel } from './shared/models';

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {

  constructor() { }

  private readonly _selectedTodos = new BehaviorSubject<TodoViewModel[]>([]);

  public readonly todos$ = this._selectedTodos.asObservable();

  private get todos(): TodoViewModel[] {
    return this._selectedTodos.getValue();
  }

  private set todos(value: TodoViewModel[]) {
    this._selectedTodos.next(value);
  }

  public updateSelectedTodos(todo: TodoViewModel): void {
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      // Replace the old todo with the new one
      this.todos[index] = todo;
    } else {
      // Add the new todo to the array
      this.todos.push(todo);
    }
    // Emit a new value for the todos$ observable
    this.todos = [...this.todos];
  }
}
