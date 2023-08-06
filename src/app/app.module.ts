import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from './task.service';
import { DueDateFormatPipe } from './pipes/due-date-format.pipe';
import { PriorityHighlightDirective } from './priority-highlight.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP_INTERCEPTORS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module'; 
import { RouterModule } from '@angular/router';
import { TaskManagerComponent } from './task-manager/task-manager.component'; 
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskItemComponent,
    DueDateFormatPipe,
    PriorityHighlightDirective,
    TaskManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule, // Include the AuthModule here
    RouterModule.forRoot([]), // Add this line with an empty array for now
  ],
  providers: [
    TaskService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Provide the AuthInterceptor here
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
