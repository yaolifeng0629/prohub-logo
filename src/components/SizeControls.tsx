'use client';

import React, { useState } from 'react';
import { useLogoStore } from '@/store/logoStore';

const PRESET_SIZES = [
  { label: '64x64', width: 64, height: 64 },
  { label: '128x128', width: 128, height: 128 },
  { label: '256x256', width: 256, height: 256 },
  { label: '512x512', width: 512, height: 512 },
  { label: '1024x1024', width: 1024, height: 1024 },
];

export const SizeControls: React.FC = () => {
  const { config, updateConfig } = useLogoStore();
  const [customSize, setCustomSize] = useState(false);

  const handlePresetSize = (width: number, height: number) => {
    updateConfig({ logoSize: { width, height } });
    setCustomSize(false);
  };

  const handleCustomSize = (width: number, height: number) => {
    updateConfig({ logoSize: { width, height } });
  };

  const isPresetSelected = (width: number, height: number) => {
    return config.logoSize.width === width && config.logoSize.height === height;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">尺寸设置</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          预设尺寸
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {PRESET_SIZES.map((size) => (
            <button
              key={size.label}
              onClick={() => handlePresetSize(size.width, size.height)}
              className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                isPresetSelected(size.width, size.height) && !customSize
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {size.label}
            </button>
          ))}
          <button
            onClick={() => setCustomSize(true)}
            className={`px-3 py-2 text-sm border rounded-md transition-colors ${
              customSize
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            自定义
          </button>
        </div>
      </div>

      {customSize && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="customWidth" className="block text-sm font-medium text-gray-700 mb-2">
              宽度 (px)
            </label>
            <input
              id="customWidth"
              type="number"
              min="16"
              max="2048"
              value={config.logoSize.width}
              onChange={(e) => handleCustomSize(parseInt(e.target.value) || 256, config.logoSize.height)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="customHeight" className="block text-sm font-medium text-gray-700 mb-2">
              高度 (px)
            </label>
            <input
              id="customHeight"
              type="number"
              min="16"
              max="2048"
              value={config.logoSize.height}
              onChange={(e) => handleCustomSize(config.logoSize.width, parseInt(e.target.value) || 256)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        当前尺寸: {config.logoSize.width} × {config.logoSize.height} px
      </div>
    </div>
  );
};
