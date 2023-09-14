export interface Task {
    id: number | null;
    name: string;
    description: string;
    completed: boolean;
    dueDate: Date | null;
    priority: string;
    user: User | null; 
  }
  
  export interface User {
   
    id: number;
    username: string;
    email: string;
   
  }