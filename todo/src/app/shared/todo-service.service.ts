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

  getTodoWidgets(): Observable<TodoModel[]> {
    const res = this.http.get<TodoModel[]>(this.api);

    return res;
  }

  getTasks(): Observable<TaskModel[]> {
    const res = this.http.get<TaskModel[]>(`${this.api}/task`);

    return res;
  }

  // getTodoWidget(id: number): Observable<TodoModel> {
  //   return of();
  // }

  getTodoViewModels(): Observable<TodoViewModel[]> {

    const todos$ = this.http.get<TodoModel[]>(this.api);
    const tasks$ = this.http.get<TaskModel[]>(`${this.api}/task`);

    return forkJoin([todos$, tasks$]).pipe(
      map(([todos, tasks]) => {
        const todoViewModel: TodoViewModel[] = [];
        let tvmId = 1;

        todos.forEach(todo => {
          const tasksPerTodo = tasks.filter(task => task.todoId === todo.id);
          console.log(tasksPerTodo);


          const tvm: TodoViewModel = {
            id: todo.id,
            title: todo.title,
            tasks: tasksPerTodo,
            createdAt: new Date(),
            editedAt: new Date()
          };

          todoViewModel.push(tvm);
        });

        return todoViewModel;
      })
    );
  }

  // getTodoViewModel(): Observable<TodoViewModel> {
  //   return of();
  // }

  postTodo(todoWidget: TodoModel): Observable<number> {
    // localStorage.setItem(todoWidget.id.toString(), JSON.stringify(todoWidget));

    const res = this.http.post(this.api, {todoWidget}, {responseType: 'json'});
    return res.pipe(map(r => +JSON.parse(JSON.stringify(r)).id)); // get the id from the response json
  }

  postTask(task: TaskModel): Observable<number> {
    const res = this.http.post(`${this.api}/task`, {task}, {responseType: 'json'});

    return res.pipe(map(r => +JSON.parse(JSON.stringify(r)).id)); // get the id from the response json)
  }

  putTask(todoWidgetId: number, todoId: number, todo: TaskModel): Observable<void> {
    return of();
  }

  deleteTodo(todoWidgetId: number): Observable<void> {
    this.http.delete(`${this.api}/${todoWidgetId}`).subscribe();
    this.http.delete(`http://localhost:3000/task/${todoWidgetId}`).subscribe();
    return of();
  }

  deleteTasks(): Observable<void> {
    this.http.delete(`${this.api}/task`).subscribe();
    return of();
  }

  deleteTask(taskId: number): Observable<void> {
    this.http.delete(`${this.api}/task/${taskId}`).subscribe();
    return of();
  }

}
