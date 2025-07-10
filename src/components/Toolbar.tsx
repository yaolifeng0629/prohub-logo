'use client';

import React from 'react';
import { useLogoStore } from '@/store/logoStore';

export const Toolbar: React.FC = () => {
  const { config, updateConfig, resetConfig, undo, redo, canUndo, canRedo } = useLogoStore();

  const quickPresets = [
    {
      name: '经典橙色',
      config: {
        leftText: 'Pro',
        rightText: 'Hub',
        backgroundColor: '#FF8C00',
        leftTextColor: '#FFFFFF',
        rightTextColor: '#000000',
        overallBackgroundColor: '#000000',
      }
    },
    {
      name: '现代蓝色',
      config: {
        leftText: 'Pro',
        rightText: 'Hub',
        backgroundColor: '#3B82F6',
        leftTextColor: '#FFFFFF',
        rightTextColor: '#FFFFFF',
        overallBackgroundColor: '#1F2937',
      }
    },
    {
      name: '简约黑白',
      config: {
        leftText: 'Pro',
        rightText: 'Hub',
        backgroundColor: '#000000',
        leftTextColor: '#000000',
        rightTextColor: '#FFFFFF',
        overallBackgroundColor: '#FFFFFF',
      }
    },
    {
      name: '活力绿色',
      config: {
        leftText: 'Pro',
        rightText: 'Hub',
        backgroundColor: '#10B981',
        leftTextColor: '#FFFFFF',
        rightTextColor: '#000000',
        overallBackgroundColor: '#065F46',
      }
    }
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    updateConfig(preset.config);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-medium text-gray-700">快速预设:</h4>
          <div className="flex flex-wrap gap-2">
            {quickPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="撤销 (Ctrl+Z)"
          >
            ↶
          </button>
          
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="重做 (Ctrl+Y)"
          >
            ↷
          </button>
          
          <button
            onClick={resetConfig}
            className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600"
            title="重置所有设置"
          >
            🔄 重置
          </button>
        </div>
      </div>
    </div>
  );
};
