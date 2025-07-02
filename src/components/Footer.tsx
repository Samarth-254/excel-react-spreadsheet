import React, { useState } from 'react';

interface FooterProps {
  onTabChange?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('All Orders');

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'reviewed', label: 'Reviewed' },
    { id: 'arrived', label: 'Arrived' }
  ];

  const handleTabClick = (tab: { id: string; label: string }) => {
    setActiveTab(tab.label);
    onTabChange?.(tab.id);
  };

  return (
    <div className="border-t border-gray-200 bg-white z-50" style={{ minHeight: '60px' }}>
      <div className="flex items-center h-full px-4">
        {/* Navigation Tabs */}
        <div className="flex items-center h-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className="px-6 py-4 transition-colors duration-200"
              style={{
                borderTop: activeTab === tab.label ? '2px solid #4B6A4F' : '2px solid transparent',
                background: activeTab === tab.label ? '#E8F0E9' : 'transparent',
                color: '#3E5741',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '24px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Plus Icon */}
        <button
          onClick={() => console.log('Add new tab clicked')}
          className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
          title="Add new tab"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
