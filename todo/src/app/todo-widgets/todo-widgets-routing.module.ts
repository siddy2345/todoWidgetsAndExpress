import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoWidgetsComponent } from './todo-widgets.component';

const routes: Routes = [{ path: '', component: TodoWidgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoWidgetsRoutingModule { }
