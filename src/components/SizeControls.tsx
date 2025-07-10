'use client';

import React, { useState } from 'react';
import { useLogoStore } from '@/store/logoStore';

const PRESET_SIZES = [
  { label: '64x64', width: 64, height: 64 },
  { label: '128x128', width: 128, height: 128 },
  { label: '256x256', width: 256, height: 256 },
  { label: '512x512', width: 512, height: 512 },
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
      <h3 className="text-base font-medium text-gray-800">尺寸设置</h3>

      <div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {PRESET_SIZES.map((size) => (
            <button
              key={size.label}
              onClick={() => handlePresetSize(size.width, size.height)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                isPresetSelected(size.width, size.height) && !customSize
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCustomSize(true)}
          className={`w-full px-3 py-2 text-sm rounded-md transition-colors ${
            customSize
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          自定义尺寸
        </button>
      </div>

      {customSize && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="customWidth" className="block text-xs font-medium text-gray-700 mb-1">
              宽度
            </label>
            <input
              id="customWidth"
              type="number"
              min="16"
              max="2048"
              value={config.logoSize.width}
              onChange={(e) => handleCustomSize(parseInt(e.target.value) || 256, config.logoSize.height)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="customHeight" className="block text-xs font-medium text-gray-700 mb-1">
              高度
            </label>
            <input
              id="customHeight"
              type="number"
              min="16"
              max="2048"
              value={config.logoSize.height}
              onChange={(e) => handleCustomSize(config.logoSize.width, parseInt(e.target.value) || 256)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
          </div>
        </div>
      )}
    </div>
  );
};
