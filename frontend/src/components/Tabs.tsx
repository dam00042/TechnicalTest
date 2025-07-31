import React from "react";

interface TabsProps {
  activeTab: 'all' | 'favorites';
  setActiveTab: (tab: 'all' | 'favorites') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="flex gap-2 mt-0 mb-2">
    <button
      className={`px-4 py-2 rounded-t-lg font-semibold border-2 ${activeTab === 'all' ? 'border-blue-600 text-blue-800 bg-blue-200 shadow' : 'border-gray-300 text-gray-500 bg-gray-100'} cursor-pointer transition`}
      onClick={() => setActiveTab('all')}
      type="button"
      title="Show all tasks"
    >
      All
    </button>
    <button
      className={`px-4 py-2 rounded-t-lg font-semibold border-2 flex items-center gap-1 ${activeTab === 'favorites' ? 'border-yellow-500 text-yellow-800 bg-yellow-200 shadow' : 'border-gray-300 text-gray-500 bg-gray-100'} cursor-pointer transition`}
      onClick={() => setActiveTab('favorites')}
      type="button"
      title="Show only favourite tasks"
    >
      <span>Favourites</span>
      <span className="text-yellow-400">★</span>
    </button>
  </div>
);

export default Tabs;
