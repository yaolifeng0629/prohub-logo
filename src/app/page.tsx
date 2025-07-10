'use client';

import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { PreviewPanel } from '@/components/PreviewPanel';
import { ControlPanel } from '@/components/ControlPanel';
import { Toolbar } from '@/components/Toolbar';
import { HelpModal } from '@/components/HelpModal';
import { useLogoStore } from '@/store/logoStore';

export default function Home() {
  const { undo, redo, config } = useLogoStore();

  // Quick export function
  const quickExport = () => {
    const canvas = document.createElement('canvas');
    canvas.width = config.logoSize.width;
    canvas.height = config.logoSize.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${config.leftText}${config.rightText}-logo.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/png', 0.9);
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          undo();
        } else if ((e.key === 'y') || (e.key === 'z' && e.shiftKey)) {
          e.preventDefault();
          redo();
        } else if (e.key === 's') {
          e.preventDefault();
          quickExport();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, config]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Toolbar />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Control Panel */}
          <div className="lg:w-1/3">
            <ControlPanel />
          </div>

          {/* Preview Area */}
          <div className="lg:w-2/3">
            <PreviewPanel />
          </div>
        </div>
      </div>

      <HelpModal />
    </div>
  );
}
