import { Injectable } from '@angular/core';
import { TaskModel, TodoModel, TodoViewModel } from './models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs'
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private api = 'http://localhost:3000/todo';

  constructor(private http: HttpClient) { }

  getTodo(): Observable<TodoModel[]> {
    const res = this.http.get<TodoModel[]>(this.api);

    return res;
  }

  getTasks(): Observable<TaskModel[]> {
    const res = this.http.get<TaskModel[]>(`${this.api}/task`);

    return res;
  }

  getTodoViewModels(): Observable<TodoViewModel[]> {

    const todos$ = this.http.get<TodoModel[]>(this.api);
    const tasks$ = this.http.get<TaskModel[]>(`${this.api}/task`);

    return forkJoin([todos$, tasks$]).pipe(
      map(([todos, tasks]) => {
        const todoViewModel: TodoViewModel[] = [];

        todos.forEach(todo => {
          const tasksPerTodo = tasks.filter(task => task.todoId === todo.id);

          const tvm: TodoViewModel = {
            id: todo.id,
            title: todo.title,
            tasks: tasksPerTodo,
            createdAt: todo.createdAt,
            editedAt: todo.editedAt
          };

          todoViewModel.push(tvm);
        });

        return todoViewModel;
      })
    );
  }

  postTodo(todoWidget: TodoModel): Observable<number> {
    // localStorage.setItem(todoWidget.id.toString(), JSON.stringify(todoWidget));

    const res = this.http.post(this.api, {todoWidget}, {responseType: 'json'});
    return res.pipe(map(r => +JSON.parse(JSON.stringify(r)).id)); // get the id from the response json
  }

  postTask(task: TaskModel): Observable<number> {
    const res = this.http.post(`${this.api}/task`, {task}, {responseType: 'json'});

    return res.pipe(map(r => +JSON.parse(JSON.stringify(r)).id)); // get the id from the response json)
  }

  putTask(task: TaskModel, isDone: boolean): Observable<void> {
    if(isDone) {
      task.isDone = true;
    } else {
      task.isDone = false;
    }

    this.http.put(`${this.api}/task/${task.id}`, task).subscribe();

    return of();
  }

  deleteTodo(todoWidgetId: number): Observable<void> {
    this.http.delete(`${this.api}/${todoWidgetId}`).subscribe();
    this.deleteTasks(todoWidgetId);
    return of();
  }

  deleteTasks(todoWidgetId: number): Observable<void> {
    this.http.delete(`${this.api}/tasks/${todoWidgetId}`).subscribe();
    return of();
  }

  deleteTask(taskId: number): Observable<void> {
    this.http.delete(`${this.api}/task/${taskId}`).subscribe();
    return of();
  }

}
