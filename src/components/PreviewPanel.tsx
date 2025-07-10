'use client';

import React from 'react';
import { LogoPreview } from './LogoPreview';

interface PreviewPanelProps {
  scale: number;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ scale }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LogoPreview scale={scale} />
    </div>
  );
};
