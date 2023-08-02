import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent // Include LoginComponent here
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule // Include RouterModule here
  ],
})
export class LoginModule {}