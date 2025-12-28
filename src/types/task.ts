export type TaskStatus = "Pending" | "Done";

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
}