'use client';

import React, { useRef, useEffect } from 'react';
import { LogoConfig, useLogoStore } from '@/store/logoStore';
import { drawLogo } from '@/lib/logo-renderer';

interface LogoPreviewProps {
  scale?: number;
  config?: LogoConfig;
  mode?: 'live' | 'compare';
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({
  scale = 1,
  config: previewConfig,
  mode = 'live',
}) => {
  const { config: storeConfig } = useLogoStore();
  const config = previewConfig ?? storeConfig;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = config.logoSize.width;
    canvas.height = config.logoSize.height;
    drawLogo(ctx, config);
  }, [config]);

  const scaledWidth = config.logoSize.width * scale;
  const scaledHeight = config.logoSize.height * scale;
  const canvasKey = [
    config.leftText,
    config.rightText,
    config.fontSize,
    config.fontWeight,
    config.fontFamily,
    config.leftTextColor,
    config.rightTextColor,
    config.backgroundColor,
    config.overallBackgroundColor,
    config.logoSize.width,
    config.logoSize.height,
    config.borderRadius,
    config.spacing,
    config.transparentBackground,
  ].join('|');

  return (
    <div className="logo-preview" aria-label="Logo preview">
      <div
        key={canvasKey}
        className="logo-canvas-frame"
        data-mode={mode}
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        <canvas
          ref={canvasRef}
          className="logo-canvas"
          style={{
            aspectRatio: `${config.logoSize.width} / ${config.logoSize.height}`,
          }}
        />
      </div>
    </div>
  );
};
