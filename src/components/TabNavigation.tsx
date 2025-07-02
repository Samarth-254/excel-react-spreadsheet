import React from 'react';
import type { TabType } from '../types';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabType[] = ['All Orders', 'Pending', 'Reviewed', 'Arrived'];

  const handleTabClick = (tab: TabType) => {
    console.log(`Tab clicked: ${tab}`);
    onTabChange(tab);
  };

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => console.log('Add new tab clicked')}
          className="px-3 py-2 text-gray-400 hover:text-gray-600 border-b-2 border-transparent"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
