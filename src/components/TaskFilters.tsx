interface Props {
  filter: string;
  setFilter: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (v: "asc" | "desc") => void;
}

export default function TaskFilters({
  filter, setFilter, search, setSearch, sort, setSort, sortDirection, setSortDirection
}: Props) {
  return (
    <div className="space-y-5">
      <h3 className="text-base font-medium text-gray-800">Filter & Search</h3>
      
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Search Tasks
        </label>
        <div className="relative">
          <input
            className="w-full px-3 py-2.5 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm"
            placeholder="Search by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filters - Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-600">
            Status Filter
          </label>
          <select 
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
            value={filter} 
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="Done">Completed</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-600">
            Sort By
          </label>
          <div className="flex gap-2">
            <select 
              className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
              value={sort} 
              onChange={e => {
                setSort(e.target.value);
                // Reset to ascending when changing sort field
                setSortDirection("asc");
              }}
            >
              <option value="date">Due Date</option>
              <option value="title">Title (A-Z)</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setSortDirection("asc")}
                className={`px-2.5 py-2.5 transition-all duration-200 flex items-center justify-center ${
                  sortDirection === "asc"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                title={`Sort ${sort === "date" ? "earliest to latest" : "A to Z"}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              <button
                onClick={() => setSortDirection("desc")}
                className={`px-2.5 py-2.5 transition-all duration-200 flex items-center justify-center ${
                  sortDirection === "desc"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                title={`Sort ${sort === "date" ? "latest to earliest" : "Z to A"}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-1">
            {sortDirection === "asc" 
              ? sort === "date" 
                ? "Earliest to latest" 
                : "A to Z"
              : sort === "date" 
                ? "Latest to earliest" 
                : "Z to A"
            }
          </div>
        </div>
      </div>
    </div>
  );
}
