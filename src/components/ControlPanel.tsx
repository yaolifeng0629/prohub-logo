'use client';

import React from 'react';
import { TextControls } from './TextControls';
import { ColorControls } from './ColorControls';
import { SizeControls } from './SizeControls';
import { ExportControls } from './ExportControls';
import { ActionControls } from './ActionControls';

export const ControlPanel: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ProHub Logo 生成器</h2>
        <p className="text-gray-600 text-sm">自定义您的专业 Logo</p>
      </div>
      
      <div className="space-y-6">
        <TextControls />
        
        <div className="border-t border-gray-200 pt-6">
          <ColorControls />
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <SizeControls />
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <ActionControls />
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <ExportControls />
        </div>
      </div>
    </div>
  );
};
