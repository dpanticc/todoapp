import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }
  completeTask(task: Task): Observable<Task> {
    // Set the 'completed' property to true for the task
    task.completed = true;

    // Send the updated task to the backend
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}`, task);
  }


  deleteTask(task: Task): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${task.id}`);
  }

  getTasksForCurrentUser(): Observable<Task[]> {
    // Replace 'getTasksForCurrentUser' with the actual API endpoint to fetch user-specific tasks
    return this.http.get<Task[]>(`${this.baseUrl}/user/tasks`);
  }
}
