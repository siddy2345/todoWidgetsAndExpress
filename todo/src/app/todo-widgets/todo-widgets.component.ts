import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { finalize, map, tap } from 'rxjs';
import { TodoModel, TodoViewModel } from '../shared/models';
import { TodoServiceService } from '../shared/todo-service.service';

@Component({
  selector: 'app-todo-widgets',
  templateUrl: './todo-widgets.component.html',
  styleUrls: ['./todo-widgets.component.css']
})
export class TodoWidgetsComponent implements OnInit {

  @Input() todoWidgets: TodoViewModel[] = [];
  public previousTodoWidgets: TodoModel[] = [];

  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.getWidgets();
  }

  getWidgets(): void {
    this.todoService.getTodoViewModels().subscribe(r => this.todoWidgets = r);
  }

  onDelete(widget: TodoViewModel): void {
    this.todoService.deleteTodo(widget.id).pipe(
      finalize(() => this.todoWidgets.splice(this.todoWidgets.indexOf(widget), 1))
    ).subscribe();
  }

}
