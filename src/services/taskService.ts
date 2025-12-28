import { type Task } from "../types/task";

const STORAGE_KEY = "tasks";

export const getTasks = (): Task[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
