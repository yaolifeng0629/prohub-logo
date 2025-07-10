'use client';

import React from 'react';
import { useLogoStore } from '@/store/logoStore';

export const ActionControls: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">快捷键</h3>

      <div className="text-sm text-gray-600 space-y-2">
        <div className="flex justify-between">
          <span>撤销:</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + Z</kbd>
        </div>
        <div className="flex justify-between">
          <span>重做:</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + Y</kbd>
        </div>
        <div className="flex justify-between">
          <span>导出:</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + S</kbd>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        💡 提示：所有操作都会自动保存到历史记录中，您可以随时撤销或重做。
      </div>
    </div>
  );
};
