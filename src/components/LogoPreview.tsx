'use client';

import React, { useRef, useEffect } from 'react';
import { useLogoStore } from '@/store/logoStore';

interface LogoPreviewProps {
  scale?: number;
  onScaleChange?: (scale: number) => void;
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

    // Set canvas size
    canvas.width = config.logoSize.width;
    canvas.height = config.logoSize.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw overall background
    if (!config.transparentBackground) {
      ctx.fillStyle = config.overallBackgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Calculate text metrics
    ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
    const leftTextMetrics = ctx.measureText(config.leftText);
    const rightTextMetrics = ctx.measureText(config.rightText);

    // Calculate dimensions
    const leftTextWidth = leftTextMetrics.width;
    const rightTextWidth = rightTextMetrics.width;
    const textHeight = config.fontSize;

    // Calculate right box dimensions
    const rightBoxPadding = 12;
    const rightBoxWidth = rightTextWidth + rightBoxPadding * 2;
    const rightBoxHeight = textHeight + rightBoxPadding * 2;

    // Calculate total width and positioning
    const totalWidth = leftTextWidth + config.spacing + rightBoxWidth;
    const startX = (canvas.width - totalWidth) / 2;
    const centerY = canvas.height / 2;

    // Draw right background box
    const rightBoxX = startX + leftTextWidth + config.spacing;
    const rightBoxY = centerY - rightBoxHeight / 2;

    ctx.fillStyle = config.backgroundColor;
    if (config.borderRadius > 0) {
      // Draw rounded rectangle
      ctx.beginPath();
      ctx.roundRect(rightBoxX, rightBoxY, rightBoxWidth, rightBoxHeight, config.borderRadius);
      ctx.fill();
    } else {
      ctx.fillRect(rightBoxX, rightBoxY, rightBoxWidth, rightBoxHeight);
    }

    // Draw left text
    ctx.fillStyle = config.leftTextColor;
    ctx.textBaseline = 'middle';
    ctx.fillText(config.leftText, startX, centerY);

    // Draw right text
    ctx.fillStyle = config.rightTextColor;
    const rightTextX = rightBoxX + rightBoxPadding;
    ctx.fillText(config.rightText, rightTextX, centerY);

  }, [config]);

  const containerStyle: React.CSSProperties = {
    transform: `scale(${scale})`,
    transformOrigin: 'center',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        style={containerStyle}
        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
      >
        <canvas
          ref={canvasRef}
          className="block"
          style={{
            width: config.logoSize.width,
            height: config.logoSize.height,
          }}
        />
      </div>
    </div>
  );
};
