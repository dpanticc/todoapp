import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskManagerService } from './task-menager.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  task: Task = {
    id: null,
    name: '',
    description: '',
    completed: false,
    dueDate: null,
    priority: '',
    user: null
  };
  constructor(private taskManagerService: TaskManagerService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskManagerService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.log('Failed to fetch tasks:', error);
      }
    );
  }

  addTask(task: Task): void {
    // Call the service to add the task
    this.taskManagerService.addTask(task).subscribe(
      (newTask) => {
        this.tasks.push(newTask);
        // Clear the form after successfully adding the task
        this.task = {
          id: null,
          name: '',
          description: '',
          completed: false,
          dueDate: null,
          priority: '',
          user: null
        };
      },
      (error) => {
        console.log('Failed to add task:', error);
      }
    );
  }

  completeTask(task: Task): void {
    // Toggle the completion status of the task
    task.completed = !task.completed;
  
    // Exclude the 'user' property from the update operation
    const updatedTask: Task = {
      ...task,
      user: null, // Set to null or omit this line if you don't want to update the user property
    };
  
    // Call the service to update the task on the backend
    this.taskManagerService.completeTask(updatedTask).subscribe(
      (updatedTaskResponse) => {
        // Find the index of the updated task in the tasks array and replace it
        const index = this.tasks.findIndex((t) => t.id === updatedTaskResponse.id);
        if (index !== -1) {
          this.tasks[index] = updatedTaskResponse;
        }
      },
      (error) => {
        console.log('Failed to mark task as completed:', error);
      }
    );
  }
  deleteTask(task: Task): void {
    this.taskManagerService.deleteTask(task).subscribe(
      () => {
        // Remove the deleted task from the tasks array
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      (error) => {
        console.log('Failed to delete task:', error);
      }
    );
  }
}
