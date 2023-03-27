import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { delay, finalize, map, pipe, tap } from 'rxjs';
import { TaskModel, TodoModel, TodoViewModel } from '../shared/models';
import { TodoServiceService } from '../shared/todo-service.service';
import { TodoStoreService } from '../todo-store.service';

@Component({
  selector: 'app-todo-widgets',
  templateUrl: './todo-widgets.component.html',
  styleUrls: ['./todo-widgets.component.css']
})
export class TodoWidgetsComponent implements OnInit {

  @Input() todoViewModel: TodoViewModel[] = [];
  @Input() tasks: TaskModel[] = [];

  public isInProgress: boolean = false;
  public closeSidebar: boolean = true; //true if sidebar should get closed
  private _selectedTodo: TodoViewModel | undefined;
  public counter: number = 1; //only if counter is even, the sidebar gets closed (clicking outside the div)

  constructor(private todoService: TodoServiceService, private todoStore: TodoStoreService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getWidgets();
  }

  getWidgets(): void {
    this.isInProgress = true;
    this.todoService.getTodoViewModels().pipe(finalize(() => this.isInProgress = false)).subscribe(tvm => {this.todoViewModel = tvm; this.getTasks()});
  }

  getTasks(): void {
    this.todoService.getTasks().subscribe(t => this.tasks = t);
  }

  onDelete(widget: TodoViewModel): void {
    this.isInProgress = true;
    this.todoService.deleteTodo(widget.id).pipe(
      finalize(() => {
        this.todoViewModel.splice(this.todoViewModel.indexOf(widget), 1);
        this.isInProgress = false;
      })
      ).subscribe();

    this.setCloseSidebar(true);
  }

  filteredTasks(widgetId: number): TaskModel[] {
    const tasksPerWidget = this.tasks.filter(t => t.todoId === widgetId);
    const onlyDoneTasks = tasksPerWidget.filter(t => t.isDone === true);
    const onlyNotDoneTasks = tasksPerWidget.filter(t => t.isDone === false).reverse();

    onlyNotDoneTasks.sort((a, b) => b.id - a.id); //sorts in reversed order before combining with tasks which are done
    return onlyNotDoneTasks.concat(onlyDoneTasks);
  }

  onSortTodo(sortValue: string): void {
    if (sortValue === 'oldest') {
      this.todoViewModel.sort((a, b) => new Date(b.editedAt).getTime() - new Date(a.editedAt).getTime());
    } else {
      this.todoViewModel.sort((a, b) => new Date(a.editedAt).getTime() - new Date(b.editedAt).getTime());
    }
  }

  changeProgressStatus(value: boolean): void {
    this.isInProgress = value;
  }

  onClickTodo(todo: TodoViewModel): void {
    this.todoStore.updateSelectedTodos(todo);
    this._selectedTodo = todo;
    this.setCloseSidebar(false);
  }

  setCloseSidebar(value: boolean) {
    this.closeSidebar = value;
  }

  onClickOutside(): void {
    if(this.counter % 2 === 0)
      this.setCloseSidebar(true);
    this.counter++;
  }
}
