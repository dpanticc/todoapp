import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';

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
    priority: '',
    user: null
  };

  submitForm() {

    if (this.task.name.trim() !== '') {
      this.addTask.emit(this.task);
      console.log('Task added:', this.task);
      alert("Task added successfully");
      this.resetForm();
    }else{
      alert("Enter a valid Task");
    }
  }

  resetForm() {
    this.task = {
      id: null,
      name: '',
      description: '',
      completed: false,
      dueDate: null,
      priority: '',
      user: null
    };
  }
}
