import { Injectable } from '@angular/core';
import { TodoModel, TodoWidgetsModel } from './models';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor() { }

  getTodoWidgets(): Observable<TodoWidgetsModel[]> {
    return of();
  }

  getTodoWidget(id: number): Observable<TodoWidgetsModel> {
    return of();
  }

  postTodoWidget(todoWidget: TodoWidgetsModel): Observable<number> {
    localStorage.setItem(todoWidget.id.toString(), JSON.stringify(todoWidget));

    return of();
  }

  postTodo(todoWidgetId: number, todo: TodoModel): Observable<number> {
    return of();
  }

  putTodo(todoWidgetId: number, todoId: number, todo: TodoModel): Observable<void> {
    return of();
  }

  deleteTodoWidget(todoWidgetId: number): Observable<void> {
    return of();
  }

  deleteTodo(todoWidgetId: number, todoId: number): Observable<void> {
    return of();
  }

}
