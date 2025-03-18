export interface Task {
  id?: string; 
  title: string;
  description: string;
  status: string;
  createdAt?: Date;
  completedAt?: Date | undefined;
  deadline?: Date | string | undefined;
  assignedUserEmail?: string | undefined;
}  