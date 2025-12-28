import { useEffect, useState } from "react";
import { type Task } from "../types/task";

interface Props {
  editingTask: Task | null;
  onSave: (data: Omit<Task, "id" | "status">) => void;
  onCancel: () => void;
}

export default function TaskForm({ editingTask, onSave, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, dueDate });
    setTitle("");
    setDueDate("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="Enter task title..."
              value={title}
              required
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={dueDate}
              required
              onChange={e => setDueDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
          <button 
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          
          <button 
            type="button" 
            onClick={onCancel} 
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
