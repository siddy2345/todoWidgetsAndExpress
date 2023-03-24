import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoWidgetsRoutingModule } from './todo-widgets-routing.module';
import { TodoWidgetsComponent } from './todo-widgets.component';
import { TodoAddComponent } from '../shared/todo-add/todo-add.component';
import { TodoItemComponent } from '../shared/todo-item/todo-item.component';
import { SidebarComponent } from '../sidebar/sidebar.component';


@NgModule({
  declarations: [
    TodoWidgetsComponent,
    TodoAddComponent,
    TodoItemComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    TodoWidgetsRoutingModule,
  ]
})
export class TodoWidgetsModule { }
