import { useEffect, useState } from "react";
import { type Task } from "./types/task";
import { getTasks, saveTasks } from "./services/taskService";
import { useDebounce } from "./hooks/useDebounce";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{show: boolean, taskId: string, taskTitle: string}>({
    show: false,
    taskId: "",
    taskTitle: ""
  });

  const debouncedSearch = useDebounce(search);

  useEffect(() => setTasks(getTasks()), []);
  useEffect(() => saveTasks(tasks), [tasks]);

  const saveTask = (data: Omit<Task, "id" | "status">) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...data } : t));
      setEditingTask(null);
    } else {
      setTasks([...tasks, {
        id: Date.now().toString(),
        status: "Pending",
        ...data
      }]);
    }
    setShowTaskForm(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCancelTask = () => {
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteRequest = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setDeleteConfirm({
        show: true,
        taskId: id,
        taskTitle: task.title
      });
    }
  };

  const handleDeleteConfirm = () => {
    setTasks(tasks.filter(t => t.id !== deleteConfirm.taskId));
    setDeleteConfirm({ show: false, taskId: "", taskTitle: "" });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, taskId: "", taskTitle: "" });
  };

  const filteredTasks = tasks
    .filter(t => filter === "All" || t.status === filter)
    .filter(t => t.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .sort((a, b) => {
      let comparison = 0;
      if (sort === "title") {
        comparison = a.title.localeCompare(b.title);
      } else {
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col lg:flex-row">
      <div className={`apple-transition ${
        showTaskForm ? 'lg:w-2/3 w-full' : 'w-full'
      } flex flex-col ${showTaskForm ? 'lg:h-screen h-1/2' : 'h-full'} ${
        deleteConfirm.show ? 'blur-sm' : ''
      } transition-all duration-300`}>
        <div className="flex-1 px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                <div className="hidden sm:block flex-1"></div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Tracker</h1>
                  <p className="text-gray-600">Stay organized and productive</p>
                </div>
                <div className="flex-1 flex justify-center sm:justify-end">
                  <button
                    onClick={() => setShowTaskForm(true)}
                    className={`bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 ${
                      showTaskForm ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={showTaskForm}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Task
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <TaskFilters
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Tasks ({filteredTasks.length})
                </h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {tasks.filter(t => t.status === "Pending").length} Pending
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {tasks.filter(t => t.status === "Done").length} Done
                  </span>
                </div>
              </div>
              
              <TaskList
                tasks={filteredTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteRequest}
                onToggle={id =>
                  setTasks(tasks.map(t =>
                    t.id === id
                      ? { ...t, status: t.status === "Pending" ? "Done" : "Pending" }
                      : t
                  ))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel Section */}
      <div className={`apple-transition bg-white border-l lg:border-l border-t lg:border-t-0 border-gray-200 shadow-2xl ${
        showTaskForm ? 'lg:w-1/3 w-full lg:h-screen h-1/2 opacity-100' : 'w-0 h-0 opacity-0 overflow-hidden'
      } ${deleteConfirm.show ? 'blur-sm' : ''} transition-all duration-300`}>
        <div className="h-full flex flex-col custom-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>
            <button
              onClick={handleCancelTask}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/60 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Form Content */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {showTaskForm && (
              <div className="animate-slide-in-right">
                <TaskForm
                  editingTask={editingTask}
                  onSave={saveTask}
                  onCancel={handleCancelTask}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {deleteConfirm.show && (
        <>
          <div 
            className="fixed inset-0 z-50 transition-all duration-500 animate-fade-in backdrop-blur-lg bg-linear-to-br from-blue-100/30 via-white/20 to-indigo-100/30"
            onClick={handleDeleteCancel}
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-pop-in transform transition-all duration-300 scale-100 border border-white/40 ring-1 ring-black/5">
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Delete Task
                  </h3>
                  <p className="text-gray-600">
                    Are you sure you want to delete <span className="font-medium text-gray-900">"{deleteConfirm.taskTitle}"</span>? This action cannot be undone.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
