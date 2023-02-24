import { Injectable } from '@angular/core';
import { TaskModel, TodoModel, TodoViewModel } from './models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs'
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private api = 'http://localhost:3000/todo';

  constructor(private http: HttpClient) { }

  getTodoWidgets(): Observable<TodoModel[]> {
    const res = this.http.get<TodoModel[]>(this.api);

    return res;
  }

  getTodoWidget(id: number): Observable<TodoModel> {
    return of();
  }

  getTodoViewModels(): Observable<TodoViewModel[]> {
    return of();
  }

  getTodoViewModel(): Observable<TodoViewModel> {
    return of();
  }

  postTodo(todoWidget: TodoModel): Observable<number> {
    // localStorage.setItem(todoWidget.id.toString(), JSON.stringify(todoWidget));

    const res = this.http.post(this.api, {todoWidget}, {responseType: 'json'});
    return res.pipe(map(r => +JSON.parse(JSON.stringify(r)).id)); // get the id from the response json
  }

  postTask(todoWidgetId: number, todo: TaskModel): Observable<number> {
    return of();
  }

  putTask(todoWidgetId: number, todoId: number, todo: TaskModel): Observable<void> {
    return of();
  }

  deleteTodo(todoWidgetId: number): Observable<void> {
    this.http.delete(`${this.api}/${todoWidgetId}`).subscribe();
    return of();
  }

  deleteTask(todoWidgetId: number, todoId: number): Observable<void> {
    return of();
  }

}
