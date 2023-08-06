import { Injectable } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  constructor(private taskService: TaskService) {}

  getTasks(): Observable<Task[]> {
    // Use the new method to fetch user-specific tasks
    return this.taskService.getTasksForCurrentUser();
  }
  completeTask(task: Task): Observable<Task> {
    return this.taskService.completeTask(task);
  }
  addTask(task: Task): Observable<Task> {
    return this.taskService.addTask(task);
  }

  deleteTask(task: Task): Observable<void> {
    return this.taskService.deleteTask(task);
  }
}
