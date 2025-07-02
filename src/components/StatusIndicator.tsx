import React from 'react';

interface StatusIndicatorProps {
  count: number;
  label: string;
  color: 'blue' | 'yellow' | 'green' | 'red';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ count, label, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    red: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${colorClasses[color]}`}>
      <span className="mr-1">{count}</span>
      <span>{label}</span>
    </div>
  );
};
