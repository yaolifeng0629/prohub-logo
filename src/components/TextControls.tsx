'use client';

import React from 'react';
import { useLogoStore } from '@/store/logoStore';

export const TextControls: React.FC = () => {
  const { config, updateConfig } = useLogoStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">文字设置</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="leftText" className="block text-sm font-medium text-gray-700 mb-2">
            左侧文字
          </label>
          <input
            id="leftText"
            type="text"
            value={config.leftText}
            onChange={(e) => updateConfig({ leftText: e.target.value.slice(0, 10) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Pro"
            maxLength={10}
          />
        </div>
        
        <div>
          <label htmlFor="rightText" className="block text-sm font-medium text-gray-700 mb-2">
            右侧文字
          </label>
          <input
            id="rightText"
            type="text"
            value={config.rightText}
            onChange={(e) => updateConfig({ rightText: e.target.value.slice(0, 10) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Hub"
            maxLength={10}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-2">
            字体大小: {config.fontSize}px
          </label>
          <input
            id="fontSize"
            type="range"
            min="16"
            max="120"
            value={config.fontSize}
            onChange={(e) => updateConfig({ fontSize: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div>
          <label htmlFor="fontWeight" className="block text-sm font-medium text-gray-700 mb-2">
            字体粗细
          </label>
          <select
            id="fontWeight"
            value={config.fontWeight}
            onChange={(e) => updateConfig({ fontWeight: e.target.value as 'normal' | 'bold' | 'bolder' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
          </select>
        </div>

        <div>
          <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-2">
            字体族
          </label>
          <select
            id="fontFamily"
            value={config.fontFamily}
            onChange={(e) => updateConfig({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="system-ui, sans-serif">System UI</option>
            <option value="'Segoe UI', sans-serif">Segoe UI</option>
            <option value="'Roboto', sans-serif">Roboto</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="spacing" className="block text-sm font-medium text-gray-700 mb-2">
            间距: {config.spacing}px
          </label>
          <input
            id="spacing"
            type="range"
            min="0"
            max="50"
            value={config.spacing}
            onChange={(e) => updateConfig({ spacing: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div>
          <label htmlFor="borderRadius" className="block text-sm font-medium text-gray-700 mb-2">
            圆角: {config.borderRadius}px
          </label>
          <input
            id="borderRadius"
            type="range"
            min="0"
            max="50"
            value={config.borderRadius}
            onChange={(e) => updateConfig({ borderRadius: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
};
