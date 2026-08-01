'use client';

import React, { useRef, useEffect } from 'react';
import { useLogoStore } from '@/store/logoStore';
import { drawLogo } from '@/lib/logo-renderer';

interface LogoPreviewProps {
  scale?: number;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({
  scale = 1
}) => {
  const { config } = useLogoStore();
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

  return (
    <div className="logo-preview" aria-label="Logo preview">
      <div
        className="logo-canvas-frame"
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
