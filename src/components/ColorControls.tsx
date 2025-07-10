'use client';

import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useLogoStore } from '@/store/logoStore';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-8 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="#000000"
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          <HexColorPicker color={color} onChange={onChange} />
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            关闭
          </button>
        </div>
      )}
    </div>
  );
};

export const ColorControls: React.FC = () => {
  const { config, updateConfig } = useLogoStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">颜色设置</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorPicker
          label="左侧文字颜色"
          color={config.leftTextColor}
          onChange={(color) => updateConfig({ leftTextColor: color })}
        />
        
        <ColorPicker
          label="右侧文字颜色"
          color={config.rightTextColor}
          onChange={(color) => updateConfig({ rightTextColor: color })}
        />
        
        <ColorPicker
          label="右侧背景颜色"
          color={config.backgroundColor}
          onChange={(color) => updateConfig({ backgroundColor: color })}
        />
        
        <ColorPicker
          label="整体背景颜色"
          color={config.overallBackgroundColor}
          onChange={(color) => updateConfig({ overallBackgroundColor: color })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="transparentBackground"
          type="checkbox"
          checked={config.transparentBackground}
          onChange={(e) => updateConfig({ transparentBackground: e.target.checked })}
          className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
        />
        <label htmlFor="transparentBackground" className="text-sm font-medium text-gray-700">
          透明背景（仅PNG格式）
        </label>
      </div>
    </div>
  );
};
