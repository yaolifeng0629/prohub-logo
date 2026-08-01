'use client';

import React from 'react';
import { Type } from 'lucide-react';
import { useLogoStore } from '@/store/logoStore';

export const TextControls: React.FC = () => {
  const { config, updateConfig } = useLogoStore();

  return (
    <div className="control-group">
      <div className="section-heading">
        <Type size={17} aria-hidden="true" />
        <h2 id="text-controls-heading" className="section-title">文字</h2>
      </div>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="leftText" className="field-label">
            左侧文字
          </label>
          <input
            id="leftText"
            type="text"
            value={config.leftText}
            onChange={(e) => updateConfig({ leftText: e.target.value.slice(0, 10) })}
            className="control-input"
            placeholder="Pro"
            maxLength={10}
          />
        </div>

        <div className="field">
          <label htmlFor="rightText" className="field-label">
            右侧文字
          </label>
          <input
            id="rightText"
            type="text"
            value={config.rightText}
            onChange={(e) => updateConfig({ rightText: e.target.value.slice(0, 10) })}
            className="control-input"
            placeholder="Hub"
            maxLength={10}
          />
        </div>
      </div>

      <div className="control-stack">
        <div className="field">
          <label htmlFor="fontSize" className="range-label">
            字体大小: {config.fontSize}px
          </label>
          <input
            id="fontSize"
            type="range"
            min="16"
            max="120"
            value={config.fontSize}
            onChange={(e) => updateConfig({ fontSize: parseInt(e.target.value) })}
            className="control-range"
          />
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="fontWeight" className="field-label">
              字体粗细
            </label>
            <select
              id="fontWeight"
              value={config.fontWeight}
              onChange={(e) => updateConfig({ fontWeight: e.target.value as 'normal' | 'bold' | 'bolder' })}
              className="control-select"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="bolder">Bolder</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="fontFamily" className="field-label">
              字体
            </label>
            <select
              id="fontFamily"
              value={config.fontFamily}
              onChange={(e) => updateConfig({ fontFamily: e.target.value })}
              className="control-select"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Helvetica, sans-serif">Helvetica</option>
              <option value="system-ui, sans-serif">System UI</option>
              <option value="'Segoe UI', sans-serif">Segoe UI</option>
              <option value="'Roboto', sans-serif">Roboto</option>
            </select>
          </div>
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="spacing" className="range-label">
              间距: {config.spacing}px
            </label>
            <input
              id="spacing"
              type="range"
              min="0"
              max="50"
              value={config.spacing}
              onChange={(e) => updateConfig({ spacing: parseInt(e.target.value) })}
              className="control-range"
            />
          </div>

          <div className="field">
            <label htmlFor="borderRadius" className="range-label">
              圆角: {config.borderRadius}px
            </label>
            <input
              id="borderRadius"
              type="range"
              min="0"
              max="50"
              value={config.borderRadius}
              onChange={(e) => updateConfig({ borderRadius: parseInt(e.target.value) })}
              className="control-range"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
