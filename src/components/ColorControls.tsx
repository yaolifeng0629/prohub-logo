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
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
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
      <h3 className="text-base font-medium text-gray-800">颜色设置</h3>

      <div className="grid grid-cols-2 gap-3">
        <ColorPicker
          label="左侧文字"
          color={config.leftTextColor}
          onChange={(color) => updateConfig({ leftTextColor: color })}
        />

        <ColorPicker
          label="右侧文字"
          color={config.rightTextColor}
          onChange={(color) => updateConfig({ rightTextColor: color })}
        />

        <ColorPicker
          label="右侧背景"
          color={config.backgroundColor}
          onChange={(color) => updateConfig({ backgroundColor: color })}
        />

        <ColorPicker
          label="整体背景"
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
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="transparentBackground" className="text-xs text-gray-700">
          透明背景（仅PNG格式）
        </label>
      </div>
    </div>
  );
};
