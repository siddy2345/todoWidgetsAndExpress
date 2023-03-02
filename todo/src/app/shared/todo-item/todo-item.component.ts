import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { delay, finalize, map, tap } from 'rxjs';
import { TaskModel, TodoViewModel } from '../models';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() task?: TaskModel;
  @Input() inProgess: boolean = false;
  @Output() deleteTaskEvent = new EventEmitter<void>();
  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
  }

  onDelete(taskId: number | undefined): void {
    if (taskId) {
      this.todoService.deleteTask(taskId).pipe(
        finalize(() => {this.deleteTaskEvent.emit();})
      ).subscribe();
    }
  }

  onCheck(task: TaskModel | undefined): void {
    if(task) this.todoService.putTask(task, true).subscribe();
  }

}
