import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule here

import { RegisterComponent } from './register.component';
import { AuthService } from '../auth.service';

@NgModule({
  declarations: [
    RegisterComponent // Include RegisterComponent here
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule // Include RouterModule here
  ],
  providers: [AuthService],
})
export class RegisterModule {}