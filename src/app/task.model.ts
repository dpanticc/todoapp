export interface Task {
    id: number | null;
    name: string;
    description: string;
    completed: boolean;
    dueDate: Date | null;
    priority: string;
    user: User | null; // If a task is not assigned to any user, user will be null
  }
  
  export interface User {
    // Add properties relevant to your User entity in the backend
    id: number;
    username: string;
    email: string;
    // Other user-related properties if needed
  }