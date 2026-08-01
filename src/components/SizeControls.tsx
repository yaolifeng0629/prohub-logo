'use client';

import React, { useState } from 'react';
import { Frame } from 'lucide-react';
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
    <div className="control-group">
      <div className="section-heading">
        <Frame size={17} aria-hidden="true" />
        <h2 id="size-controls-heading" className="section-title">画布</h2>
      </div>

      <div className="size-control-stack">
        <div className="size-presets">
          {PRESET_SIZES.map((size) => (
            <button
              key={size.label}
              type="button"
              onClick={() => handlePresetSize(size.width, size.height)}
              className={`size-preset ${
                isPresetSelected(size.width, size.height) && !customSize
                  ? 'is-selected'
                  : ''
              }`}
            >
              <span className="size-preset-shape" aria-hidden="true" />
              <span>{size.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCustomSize(true)}
          className={`custom-size-button ${
            customSize
              ? 'is-selected'
              : ''
          }`}
        >
          自定义尺寸
        </button>
      </div>

      {customSize && (
        <div className="field-grid">
          <div className="field">
            <label htmlFor="customWidth" className="field-label">
              宽度
            </label>
            <input
              id="customWidth"
              type="number"
              min="16"
              max="2048"
              value={config.logoSize.width}
              onChange={(e) => handleCustomSize(parseInt(e.target.value) || 256, config.logoSize.height)}
              className="control-input"
            />
          </div>

          <div className="field">
            <label htmlFor="customHeight" className="field-label">
              高度
            </label>
            <input
              id="customHeight"
              type="number"
              min="16"
              max="2048"
              value={config.logoSize.height}
              onChange={(e) => handleCustomSize(config.logoSize.width, parseInt(e.target.value) || 256)}
              className="control-input"
            />
          </div>
        </div>
      )}
    </div>
  );
};
