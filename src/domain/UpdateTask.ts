import { Task } from "./Task";

export interface UpdateTask extends Task {
    id: string;  
    deadline?: Date | string | undefined;
}  