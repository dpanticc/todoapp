import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task = {} as Task;
  @Output() completeTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  complete() {
    this.completeTask.emit(this.task);  }

  delete() {
    this.deleteTask.emit(this.task);
  }
}