export interface User {
  id: number;
  name: string;
  email: string;
  tasks?: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  user: User;
}
