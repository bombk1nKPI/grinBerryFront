import { Task } from "./task";

export interface User {
    username: string;
    roles: string[];
    tasks: Task[];
  }