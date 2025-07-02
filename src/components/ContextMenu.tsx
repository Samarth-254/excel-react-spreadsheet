import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onAction }) => {
  const menuItems = [
    { label: 'Copy', action: 'copy', icon: '📋' },
    { label: 'Paste', action: 'paste', icon: '📄' },
    { label: 'Cut', action: 'cut', icon: '✂️' },
    { label: 'Delete', action: 'delete', icon: '🗑️' },
    { label: 'Insert Row Above', action: 'insert-row-above', icon: '⬆️' },
    { label: 'Insert Row Below', action: 'insert-row-below', icon: '⬇️' },
    { label: 'Insert Column Left', action: 'insert-col-left', icon: '⬅️' },
    { label: 'Insert Column Right', action: 'insert-col-right', icon: '➡️' },
  ];

  const handleAction = (action: string) => {
    onAction(action);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Context Menu */}
      <div
        className="fixed z-50 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-48"
        style={{ left: x, top: y }}
      >
        {menuItems.map((item) => (
          <button
            key={item.action}
            onClick={() => handleAction(item.action)}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};
