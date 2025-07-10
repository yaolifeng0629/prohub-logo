'use client';

import React from 'react';
import { TextControls } from './TextControls';
import { ColorControls } from './ColorControls';
import { SizeControls } from './SizeControls';
import { ExportControls } from './ExportControls';
import { ActionControls } from './ActionControls';

export const ControlPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Logo 设置</h2>
        <p className="text-sm text-gray-600 mt-1">自定义您的专业 Logo</p>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          <TextControls />
          <ColorControls />
          <SizeControls />
          <ActionControls />
        </div>
      </div>

      {/* Export Section */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <ExportControls />
      </div>
    </div>
  );
};
