import { type Task } from "../types/task";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status === "Pending";
  const isDueToday = new Date(task.dueDate).toDateString() === new Date().toDateString();
  
  return (
    <div className={`group p-4 border rounded-lg transition-all duration-200 hover:shadow-md animate-slide-in ${
      task.status === "Done" 
        ? "bg-green-50 border-green-200" 
        : isOverdue 
        ? "bg-red-50 border-red-200" 
        : isDueToday 
        ? "bg-yellow-50 border-yellow-200" 
        : "bg-white border-gray-200 hover:border-gray-300"
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => onToggle(task.id)}
              className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                task.status === "Done"
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 hover:border-green-400 hover:bg-green-50"
              }`}
            >
              {task.status === "Done" && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <h3 className={`font-medium text-gray-900 ${
              task.status === "Done" ? "line-through text-gray-500" : ""
            }`}>
              {task.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={isOverdue ? "text-red-600 font-medium" : isDueToday ? "text-yellow-600 font-medium" : ""}>
                {new Date(task.dueDate).toLocaleDateString()}
                {isOverdue && " (Overdue)"}
                {isDueToday && " (Due Today)"}
              </span>
            </div>
            
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              task.status === "Done" 
                ? "bg-green-100 text-green-800" 
                : "bg-orange-100 text-orange-800"
            }`}>
              {task.status}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
