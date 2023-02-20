import { Component, Input, OnInit } from '@angular/core';
import { TodoWidgetsModel } from '../models';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  @Input() isAddWidget?: boolean;

  constructor(private todoService: TodoServiceService) {}

  ngOnInit(): void {
  }

  public addWidget(input: HTMLInputElement) {
    const keys = Object.keys(localStorage);
    const incrementedId = keys[keys.length];
    let todoWidgetsModel: TodoWidgetsModel = {
      id: +incrementedId,
      title: input.value,
      createdAt: Date.now(),
      editedAt: Date.now(),
      todos: undefined
    };

    alert(todoWidgetsModel.id);
    this.todoService.postTodoWidget(todoWidgetsModel);
  }

}
