import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { LoginGuard } from './auth/login.guard'; // Import your AuthGuard
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard], // Use LoginGuard for the login route
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    component: TaskManagerComponent,
    canActivate: [AuthGuard], // Use AuthGuard for protected routes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
