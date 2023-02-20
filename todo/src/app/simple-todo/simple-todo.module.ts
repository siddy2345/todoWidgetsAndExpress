import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleTodoRoutingModule } from './simple-todo-routing.module';
import { SimpleTodoComponent } from './simple-todo.component';


@NgModule({
  declarations: [
    SimpleTodoComponent
  ],
  imports: [
    CommonModule,
    SimpleTodoRoutingModule
  ]
})
export class SimpleTodoModule { }
