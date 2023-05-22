import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() addTask = new EventEmitter<Task>();

  task: Task = {
    id: null,
    name: '',
    description: '',
    completed: false,
    dueDate: null,
    priority: ''
  };

  constructor(private taskService: TaskService) {}

  submitForm() {
    console.log('Submit form clicked');
    console.log('Task:', this.task);

    if (this.task.name.trim() !== '') {
      this.addTask.emit(this.task);
      console.log('Task added:', this.task);
      this.resetForm();
    }
  }

  resetForm() {
    this.task = {
      id: null,
      name: '',
      description: '',
      completed: false,
      dueDate: null,
      priority: ''
    };
  }
}