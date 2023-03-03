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
  @Output() inProgessEvent = new EventEmitter<boolean>();
  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
  }

  onDelete(taskId: number | undefined): void {
    if (taskId) {
      this.inProgessEvent.emit(true);

      this.todoService.deleteTask(taskId).pipe(
        finalize(() => {
          this.deleteTaskEvent.emit();
          this.inProgessEvent.emit(false);
        })
      ).subscribe();
    }
  }

  onCheck(task: TaskModel | undefined): void {
    this.inProgess = true;

    this.inProgessEvent.emit(true);

    if(task?.isDone) {
      this.todoService.putTask(task, false).pipe(finalize(() => {
        this.inProgess = false;
        this.inProgessEvent.emit(false);
      })).subscribe();

    } else if (task?.isDone === false) {
      this.todoService.putTask(task, true).pipe(finalize(() => {
        this.inProgess = false;
        this.inProgessEvent.emit(false);
      })).subscribe();

    }

    // this.inProgess = false;
  }

}
