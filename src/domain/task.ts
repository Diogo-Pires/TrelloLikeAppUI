export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    completedAt: Date;
    deadline: Date;
    assignedUserEmail: string
  }  