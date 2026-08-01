'use client';

import React from 'react';
import { LogoPreview } from './LogoPreview';

interface PreviewPanelProps {
  scale: number;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ scale }) => {
  return (
    <div className="preview-panel">
      <LogoPreview scale={scale} />
    </div>
  );
};
