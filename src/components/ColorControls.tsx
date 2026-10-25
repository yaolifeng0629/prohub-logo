'use client';

import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Check } from 'lucide-react';
import { useLogoStore } from '@/store/logoStore';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="color-field">
      <label className="field-label">
        {label}
      </label>
      <div className="color-control-row">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="color-swatch-button"
          style={{ backgroundColor: color }}
          aria-label={`选择${label}颜色`}
          aria-expanded={isOpen}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
          placeholder="#000000"
        />
      </div>

      {isOpen && (
        <div className="color-picker-popover">
          <HexColorPicker color={color} onChange={onChange} />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="color-picker-close"
          >
            <Check size={15} aria-hidden="true" />
            完成
          </button>
        </div>
      )}
    </div>
  );
};

interface Props {
  sectionNumber?: number;
}

export const ColorControls: React.FC<Props> = ({ sectionNumber }) => {
  const { config, updateConfig } = useLogoStore();

  return (
    <div className="control-group">
      <div className="section-heading">
        {sectionNumber != null && (
          <span className="section-number" aria-hidden="true">{String(sectionNumber).padStart(2, '0')}</span>
        )}
        <h2 id="color-controls-heading" className="section-title">色彩</h2>
      </div>

      <div className="color-grid">
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

      <div className="checkbox-row">
        <input
          id="transparentBackground"
          type="checkbox"
          checked={config.transparentBackground}
          onChange={(e) => updateConfig({ transparentBackground: e.target.checked })}
          className="control-checkbox"
        />
        <label htmlFor="transparentBackground" className="checkbox-label">
          透明背景（仅PNG格式）
        </label>
      </div>
    </div>
  );
};
