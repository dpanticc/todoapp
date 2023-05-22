import { Component } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
  }

  addTask(task: Task) {
    this.taskService.addTask(task);
    this.tasks = this.taskService.getAllTasks(); // Update the tasks list
  }
}