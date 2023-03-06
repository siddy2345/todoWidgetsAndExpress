import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
import { TaskModel, TodoModel } from '../models';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  @Input() isAddWidget?: boolean;
  @Input() todoId?: number;
  @Input() inProgress: boolean = false;
  @Output() addWidgetEvent = new EventEmitter<number>();
  @Output() addTaskEvent = new EventEmitter<number>();

  constructor(private todoService: TodoServiceService) {}

  private _latestTodoWidget: number = 1;
  private _latestTask: number = 1;

  ngOnInit(): void {
  }

  public async addTodo(input: HTMLInputElement, event: Event) {
    // const keys = Object.keys(localStorage);
    event.preventDefault();

    if(input.value.trim() !== '') {

      await this.getTodoWidgets();

      let todoModel: TodoModel = {
        id: this._latestTodoWidget,
        title: input.value,
        createdAt: new Date(),
        editedAt: new Date()
      };

      this.todoService.postTodo(todoModel).subscribe(newTodoWidget =>
        this.addWidgetEvent.emit(newTodoWidget)
      );

      input.value = '';
    }

  }

  public async addTask(input: HTMLInputElement, event: Event) {
    event.preventDefault();

    if(input.value.trim() !== '') {

      await this.getTasks();

      let taskModel: TaskModel;

      if(this.todoId) {
        taskModel = {
          id: this._latestTask,
          title: input.value,
          isDone: false,
          todoId: this.todoId
        };

        this.todoService.postTask(taskModel).subscribe(newTask =>
          this.addTaskEvent.emit(newTask)
        );

        input.value = '';
      }

    }
  }

  async getTodoWidgets(): Promise<void> {
    const obs = this.todoService.getTodo();
    try {
      const result = await lastValueFrom(obs);
      let newId = result[result.length - 1].id;

      if(result.length > 0 && this._latestTodoWidget > 0) {
        this._latestTodoWidget = ++newId;
      } else {
        this._latestTodoWidget = 1;
      }

    } catch {
    }
  }

  async getTasks(): Promise<void> {
    const obs = this.todoService.getTasks();
    try {
      const result = await lastValueFrom(obs);
      let newId = result[result.length - 1].id;

      if(result.length > 0 && this._latestTask > 0) {
        this._latestTask = ++newId;
      } else {
        this._latestTask = 1;
      }

    } catch {
    }
  }
}
