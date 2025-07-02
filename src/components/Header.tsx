import React, { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleButtonClick = (action: string) => {
    console.log(`${action} clicked`);
    if (action === 'Notifications') {
      setShowNotifications(!showNotifications);
    }
  };

  const handleSearch = (query: string) => {
    onSearchChange(query);
    console.log('Search query:', query);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18.75 4C20.5449 4 22 5.45507 22 7.25V16.75C22 18.5449 20.5449 20 18.75 20H5.25C3.45507 20 2 18.5449 2 16.75V7.25C2 5.45507 3.45507 4 5.25 4H18.75ZM5.25 5.5C4.2835 5.5 3.5 6.2835 3.5 7.25V16.75C3.5 17.7165 4.2835 18.5 5.25 18.5H14.5V5.5H5.25Z" fill="#618666"/>
          </svg>
          <span>Workspace</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Folder 2</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium text-gray-900">Spreadsheet 3</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6.45832 10C6.45832 10.8054 5.80541 11.4583 4.99999 11.4583C4.19457 11.4583 3.54166 10.8054 3.54166 10C3.54166 9.19459 4.19457 8.54167 4.99999 8.54167C5.80541 8.54167 6.45832 9.19459 6.45832 10ZM11.4583 10C11.4583 10.8054 10.8054 11.4583 9.99999 11.4583C9.19457 11.4583 8.54166 10.8054 8.54166 10C8.54166 9.19459 9.19457 8.54167 9.99999 8.54167C10.8054 8.54167 11.4583 9.19459 11.4583 10ZM15 11.4583C15.8054 11.4583 16.4583 10.8054 16.4583 10C16.4583 9.19459 15.8054 8.54167 15 8.54167C14.1946 8.54167 13.5417 9.19459 13.5417 10C13.5417 10.8054 14.1946 11.4583 15 11.4583Z" fill="#AFAFAF"/>
          </svg>
        </div>

        {/* Right side - Search and User */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search within sheet"
              value={searchQuery}
              className="pl-8 pr-4 py-1.5 text-sm bg-[#F6F6F6] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <svg 
              className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => handleButtonClick('Notifications')}
              className="relative p-1.5 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 1.99622C16.0499 1.99622 19.3567 5.19097 19.4958 9.24528L19.5 9.49622V13.5932L20.88 16.7492C20.949 16.9071 20.9847 17.0776 20.9847 17.25C20.9847 17.9404 20.425 18.5 19.7347 18.5L15 18.5015C15 20.1583 13.6568 21.5015 12 21.5015C10.4023 21.5015 9.09633 20.2526 9.00508 18.6778L8.99954 18.4992L4.27485 18.5C4.10351 18.5 3.93401 18.4648 3.77685 18.3965C3.14365 18.1215 2.8533 17.3852 3.12834 16.752L4.49999 13.5941V9.49612C4.50059 5.34132 7.85208 1.99622 12 1.99622ZM13.4995 18.4992L10.5 18.5015C10.5 19.3299 11.1716 20.0015 12 20.0015C12.7797 20.0015 13.4204 19.4066 13.4931 18.646L13.4995 18.4992ZM12 3.49622C8.67983 3.49622 6.00047 6.17048 5.99999 9.49622V13.9059L4.65601 17H19.3525L18 13.9068L18.0001 9.50908L17.9964 9.28388C17.8853 6.0504 15.2416 3.49622 12 3.49622Z" fill="#121212"/>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center" style={{ backgroundColor: '#4B6A4F', fontSize: '11px', fontWeight: '600' }}>
                1
              </span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Notifications</h3>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                      <p className="text-sm text-gray-800">New task assigned: "Launch social media campaign"</p>
                      <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format"
              alt="John Doe"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">John Doe</span>
              <span className="text-xs text-gray-500">john.doe...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
