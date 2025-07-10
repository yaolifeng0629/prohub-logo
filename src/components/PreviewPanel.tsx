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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          实时预览
        </h3>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              id="showGrid"
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
            />
            <label htmlFor="showGrid" className="text-sm text-gray-700">
              网格背景
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="scale" className="text-sm text-gray-700">
              缩放:
            </label>
            <select
              id="scale"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {scaleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-auto max-h-96">
        <LogoPreview scale={scale} showGrid={showGrid && config.transparentBackground} />
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-600 space-y-1">
        <p>💡 提示：使用 Ctrl+Z 撤销，Ctrl+Y 重做</p>
        <p>🎨 调整左侧设置，实时查看效果</p>
        <p>📏 当前尺寸: {config.logoSize.width} × {config.logoSize.height} px</p>
      </div>
    </div>
  );
};
