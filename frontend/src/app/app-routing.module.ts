import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { UsersComponent } from './users/users.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';


const routes: Routes = [
  {
    path:'',component:UsersComponent,data:{title:"Users Information"},
  },
  {path:'tasks',component:UserTasksComponent,data:{title:"Create|Update Tasks"}},
  { path: '**', redirectTo:'/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
