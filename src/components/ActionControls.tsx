'use client';

import React from 'react';


export const ActionControls: React.FC = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-gray-800">快捷键</h3>

      <div className="text-xs text-gray-700 space-y-1">
        <div className="flex justify-between items-center">
          <span>撤销</span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl + Z</kbd>
        </div>
        <div className="flex justify-between items-center">
          <span>重做</span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl + Y</kbd>
        </div>
        <div className="flex justify-between items-center">
          <span>快速导出</span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl + S</kbd>
        </div>
      </div>
    </div>
  );
};
