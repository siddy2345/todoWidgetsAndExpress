import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { TaskModel } from '../models';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() task?: TaskModel;
  @Output() deleteTaskEvent = new EventEmitter<void>();

  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
  }

  onDelete(task: number): void {
    this.todoService.deleteTask(task).pipe(
      finalize(() => {
        console.log('ok');

        this.deleteTaskEvent.emit();
      })
    ).subscribe();
  }

}
