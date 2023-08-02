import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  completeTask(task: Task): Observable<Task> {
    const updatedTask: Task = {
      ...task,
      completed: !task.completed,
    };
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, updatedTask);
  }

  deleteTask(task: Task): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${task.id}`);
  }
}