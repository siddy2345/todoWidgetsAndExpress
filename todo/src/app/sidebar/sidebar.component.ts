import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { last, lastValueFrom, map, switchMap, takeLast } from 'rxjs';
import { TodoViewModel } from '../shared/models';
import { TodoStoreService } from '../todo-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() closeSidebar = new EventEmitter<boolean>();

  public selectedTodo: TodoViewModel | undefined;

  constructor(public todoStore: TodoStoreService) { }

  ngOnInit(): void {
    this.todoStore.todos$.pipe(map(t => this.selectedTodo = t[t.length - 1])).subscribe();
  }

  onClose(): void {
    this.closeSidebar.emit(true);
  }
}
