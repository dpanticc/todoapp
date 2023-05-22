import { Component, Input } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  completeTask(task: Task) {
    this.taskService.markTaskAsCompleted(task);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
    this.tasks = this.taskService.getAllTasks(); // Update the tasks after deletion
  }
}