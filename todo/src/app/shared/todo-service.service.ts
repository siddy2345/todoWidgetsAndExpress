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

  getTasks(): Observable<TaskModel[]> {
    const res = this.http.get<TaskModel[]>(`${this.api}/task`);

    return res;
  }

  // getTodoWidget(id: number): Observable<TodoModel> {
  //   return of();
  // }

  getTodoViewModels(): Observable<TodoViewModel[]> {
    console.log("o");

    const todos = this.http.get<TodoModel[]>(this.api);
    const tasks = this.http.get<TaskModel[]>(`${this.api}/task`);

    const todoList: TodoModel[] = [];
    const taskList: TaskModel[] = [];

    todos.subscribe(t => todoList.push(...t));
    tasks.subscribe(t => taskList.push(...t));

    console.log(todoList);
    console.log(taskList);

    const todoViewModel: TodoViewModel[] = [];
    let tvmId: number = 1;

    todoList.forEach(todo => {
      const tasksPerTodo: TaskModel[] = [];

      taskList.forEach(task => {
        if(todo.id === task.id)
          tasksPerTodo.push(task);
      });

      const tvm: TodoViewModel = {
        id: tvmId++,
        title: todo.title,
        tasks: taskList,
        createdAt: new Date(),
        editedAt: new Date()
      }

      todoViewModel.push(tvm);
    });

    return of(todoViewModel);
  }

  // getTodoViewModel(): Observable<TodoViewModel> {
  //   return of();
  // }

  postTodo(todoWidget: TodoModel): Observable<number> {
    // localStorage.setItem(todoWidget.id.toString(), JSON.stringify(todoWidget));

    const res = this.http.post(this.api, {todoWidget}, {responseType: 'json'});
    return res.pipe(map(r => +JSON.parse(JSON.stringify(r)).id)); // get the id from the response json
  }

  postTask(todoWidgetId: number, task: TaskModel): Observable<number> {
    const res = this.http.post(`${this.api}/task`, {task}, {responseType: 'json'});

    return res.pipe(map(r => +JSON.parse(JSON.stringify(r)).id)); // get the id from the response json)
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
