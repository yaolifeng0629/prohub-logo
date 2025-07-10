'use client';

import React, { useState } from 'react';
import { LogoPreview } from './LogoPreview';
import { useLogoStore } from '@/store/logoStore';

export const PreviewPanel: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const { config } = useLogoStore();

  const scaleOptions = [
    { label: '25%', value: 0.25 },
    { label: '50%', value: 0.5 },
    { label: '75%', value: 0.75 },
    { label: '100%', value: 1 },
    { label: '150%', value: 1.5 },
    { label: '200%', value: 2 },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Preview Controls */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              showGrid
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-gray-100 text-gray-800 border border-gray-200'
            }`}
          >
            {showGrid ? '🔲' : '⬜'} 网格
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">缩放:</span>
            <select
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            >
              {scaleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-700">
          {config.logoSize.width} × {config.logoSize.height} px
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center">
        <LogoPreview scale={scale} showGrid={showGrid && config.transparentBackground} />
      </div>
    </div>
  );
};
