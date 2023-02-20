import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'simple', loadChildren: () => import('./simple-todo/simple-todo.module').then(m => m.SimpleTodoModule) },
  { path: 'widgets', loadChildren: () => import('./todo-widgets/todo-widgets.module').then(m => m.TodoWidgetsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
