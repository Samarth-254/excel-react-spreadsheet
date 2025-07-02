import React, { useState } from 'react';
import { Header, Toolbar, Spreadsheet } from './components';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Toolbar
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
      />
      <div className="flex-1 overflow-hidden">
        <Spreadsheet
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
        />
      </div>
      {/* TabNavigation and Footer hidden as per Figma design */}
    </div>
  );
}

export default App;
