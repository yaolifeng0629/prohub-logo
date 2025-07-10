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
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-800">快速预设:</span>
        <div className="flex space-x-1">
          {quickPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPreset(preset)}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={undo}
          disabled={!canUndo()}
          className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="撤销 (Ctrl+Z)"
        >
          ↶
        </button>

        <button
          onClick={redo}
          disabled={!canRedo()}
          className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="重做 (Ctrl+Y)"
        >
          ↷
        </button>

        <button
          onClick={resetConfig}
          className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
          title="重置所有设置"
        >
          🔄
        </button>
      </div>
    </div>
  );
};
