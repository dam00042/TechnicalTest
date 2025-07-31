import React from "react";

interface StatusFilterProps {
  statusFilter: 'all' | 'completed' | 'not_completed';
  setStatusFilter: (status: 'all' | 'completed' | 'not_completed') => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ statusFilter, setStatusFilter }) => (
  <div className="flex items-center gap-2 mb-4">
    <span className="text-sm font-medium text-gray-700 mr-2">Filter by completion:</span>
    <button
      className={`px-3 py-1 rounded-lg text-sm font-medium border cursor-pointer ${statusFilter === 'all' ? 'bg-blue-100 text-blue-700 border-blue-400' : 'bg-gray-100 text-gray-500 border-gray-300'} transition`}
      onClick={() => setStatusFilter('all')}
      type="button"
    >
      All
    </button>
    <button
      className={`px-3 py-1 rounded-lg text-sm font-medium border cursor-pointer ${statusFilter === 'completed' ? 'bg-green-100 text-green-700 border-green-400' : 'bg-gray-100 text-gray-500 border-gray-300'} transition`}
      onClick={() => setStatusFilter('completed')}
      type="button"
    >
      Completed
    </button>
    <button
      className={`px-3 py-1 rounded-lg text-sm font-medium border cursor-pointer ${statusFilter === 'not_completed' ? 'bg-red-100 text-red-700 border-red-400' : 'bg-gray-100 text-gray-500 border-gray-300'} transition`}
      onClick={() => setStatusFilter('not_completed')}
      type="button"
    >
      Not Completed
    </button>
  </div>
);

export default StatusFilter;
