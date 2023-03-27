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
    this.todos = [todo];
  }
}
