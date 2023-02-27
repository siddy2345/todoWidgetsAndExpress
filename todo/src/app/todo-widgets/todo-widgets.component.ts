import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { delay, finalize, map, tap } from 'rxjs';
import { TaskModel, TodoModel, TodoViewModel } from '../shared/models';
import { TodoServiceService } from '../shared/todo-service.service';

@Component({
  selector: 'app-todo-widgets',
  templateUrl: './todo-widgets.component.html',
  styleUrls: ['./todo-widgets.component.css']
})
export class TodoWidgetsComponent implements OnInit {

  @Input() todoWidgets: TodoViewModel[] = [];
  @Input() tasks: TaskModel[] = [];
  public previousTodoWidgets: TodoModel[] = [];

  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.getWidgets();
    this.getTasks();
  }

  getWidgets(): void {
    this.todoService.getTodoViewModels().subscribe(tvm => this.todoWidgets = tvm);
  }

  getTasks(): void {
    this.todoService.getTasks().subscribe(t => this.tasks = t.sort((a, b) => b.id - a.id && +a.isDone - +b.isDone));
  }

  onDelete(widget: TodoViewModel): void {
    this.todoService.deleteTodo(widget.id).pipe(
      finalize(() => this.todoWidgets.splice(this.todoWidgets.indexOf(widget), 1))
    ).subscribe();
  }

}
