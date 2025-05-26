export interface User {
  id: number;
  name: string;
  email: string;
  taskCount?: number;
  tasks?: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  status: "todo" | "in-progress" | "done";
  user: User;
}
