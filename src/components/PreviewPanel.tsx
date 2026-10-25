'use client';

import React from 'react';
import { LogoConfig, useLogoStore } from '@/store/logoStore';
import { LogoPreview } from './LogoPreview';

interface PreviewPanelProps {
  scale: number;
  comparisonConfig?: LogoConfig;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ scale, comparisonConfig }) => {
  const { config: currentConfig } = useLogoStore();
  const config = comparisonConfig ?? currentConfig;
  const isComparing = Boolean(comparisonConfig);
  const mode = isComparing ? 'compare' : 'live';

  return (
    <div className="preview-panel">
      <div className="preview-stage-status" data-mode={mode} aria-live="polite">
        <span><i aria-hidden="true" />{isComparing ? '原始方案对照' : '实时画布'}</span>
        <span>{config.logoSize.width} × {config.logoSize.height} PX</span>
      </div>
      <div className="preview-stage">
        <span className="preview-corner-tr" aria-hidden="true" />
        <span className="preview-corner-bl" aria-hidden="true" />
        <LogoPreview scale={scale} config={config} mode={mode} />
      </div>
      <div className="preview-stage-footer">
        <span>{isComparing ? '对照模式 · 仅预览' : (config.transparentBackground ? 'PNG 透明背景' : '背景已启用')}</span>
        <span>{isComparing ? 'COMPARE' : 'LIVE'}</span>
      </div>
    </div>
  );
};
