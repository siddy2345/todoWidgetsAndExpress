import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoStoreService } from '../todo-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  constructor(public todoStore: TodoStoreService) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.closeSidebarEvent.emit(true);
  }
}
