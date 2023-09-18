import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() sortTasksByDate = new EventEmitter<Task[]>();


  
  
  constructor(private taskService: TaskService) {}

  completeTask(task: Task): void {
    this.taskService.completeTask(task).subscribe((completedTask) => {
      task.completed = completedTask.completed;
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      const index = this.tasks.indexOf(task);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    });
  }
}
