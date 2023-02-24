import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
import { TodoModel } from '../models';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  @Input() isAddWidget?: boolean;
  @Output() addWidgetEvent = new EventEmitter<number>();

  constructor(private todoService: TodoServiceService) {}

  private _latestTodoWidget: number = 1;

  ngOnInit(): void {
  }

  public async addWidget(input: HTMLInputElement, event: Event) {
    // const keys = Object.keys(localStorage);
    event.preventDefault();

    await this.getTodoWidgets();

    // console.log(this._latestTodoWidget);

    console.log(this._latestTodoWidget);

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

  async getTodoWidgets(): Promise<void> {
    const obs = this.todoService.getTodoWidgets();
    try {
      const result = await lastValueFrom(obs);

      console.log(`vorher: ${this._latestTodoWidget}`);

      if(result.length > 0 && this._latestTodoWidget > 0) {
        this._latestTodoWidget = ++result.length;
      } else {
        this._latestTodoWidget = 1;
      }

      console.log(`nachher: ${this._latestTodoWidget}`);
      console.log(result);

    } catch {
    }
  }

}
