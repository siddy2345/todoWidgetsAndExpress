import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleTodoComponent } from './simple-todo.component';

const routes: Routes = [{ path: '', component: SimpleTodoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleTodoRoutingModule { }
