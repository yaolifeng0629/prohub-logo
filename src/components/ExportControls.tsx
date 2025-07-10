'use client';

import React, { useState } from 'react';
import { useLogoStore } from '@/store/logoStore';

type ExportFormat = 'png' | 'jpg' | 'svg' | 'webp';

export const ExportControls: React.FC = () => {
  const { config } = useLogoStore();
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const [quality, setQuality] = useState(0.9);
  const [isExporting, setIsExporting] = useState(false);

  const createCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = config.logoSize.width;
    canvas.height = config.logoSize.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get canvas context');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw overall background
    if (!config.transparentBackground || exportFormat !== 'png') {
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

    return canvas;
  };

  const createSVG = (): string => {
    const { width, height } = config.logoSize;

    // Create a temporary canvas to measure text accurately
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) throw new Error('Cannot get canvas context');

    tempCtx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
    const leftTextMetrics = tempCtx.measureText(config.leftText);
    const rightTextMetrics = tempCtx.measureText(config.rightText);

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
    const startX = (width - totalWidth) / 2;
    const centerY = height / 2;

    // Calculate right box position
    const rightBoxX = startX + leftTextWidth + config.spacing;
    const rightBoxY = centerY - rightBoxHeight / 2;
    const rightTextX = rightBoxX + rightBoxPadding;

    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${!config.transparentBackground ? `<rect width="100%" height="100%" fill="${config.overallBackgroundColor}"/>` : ''}
        <rect x="${rightBoxX}" y="${rightBoxY}" width="${rightBoxWidth}" height="${rightBoxHeight}"
              fill="${config.backgroundColor}" rx="${config.borderRadius}"/>
        <text x="${startX}" y="${centerY}" font-family="${config.fontFamily}" font-size="${config.fontSize}"
              font-weight="${config.fontWeight}" fill="${config.leftTextColor}" dominant-baseline="middle">
          ${config.leftText}
        </text>
        <text x="${rightTextX}" y="${centerY}" font-family="${config.fontFamily}" font-size="${config.fontSize}"
              font-weight="${config.fontWeight}" fill="${config.rightTextColor}" dominant-baseline="middle">
          ${config.rightText}
        </text>
      </svg>
    `.trim();
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportLogo = async () => {
    setIsExporting(true);

    try {
      const filename = `${config.leftText}${config.rightText}-logo`;

      if (exportFormat === 'svg') {
        const svgContent = createSVG();
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        downloadFile(blob, `${filename}.svg`);
      } else {
        const canvas = createCanvas();

        canvas.toBlob((blob) => {
          if (blob) {
            downloadFile(blob, `${filename}.${exportFormat}`);
          }
        }, `image/${exportFormat}`, quality);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAllFormats = async () => {
    setIsExporting(true);

    try {
      const filename = `${config.leftText}${config.rightText}-logo`;
      const formats: ExportFormat[] = ['png', 'jpg', 'svg', 'webp'];

      for (const format of formats) {
        if (format === 'svg') {
          const svgContent = createSVG();
          const blob = new Blob([svgContent], { type: 'image/svg+xml' });
          downloadFile(blob, `${filename}.svg`);
        } else {
          const canvas = createCanvas();
          await new Promise<void>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) {
                downloadFile(blob, `${filename}.${format}`);
              }
              resolve();
            }, `image/${format}`, quality);
          });
        }

        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error('Batch export failed:', error);
      alert('批量导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-800">导出 Logo</h3>

      <div className="space-y-3">
        <div>
          <label htmlFor="exportFormat" className="block text-xs font-medium text-gray-700 mb-1">
            格式
          </label>
          <select
            id="exportFormat"
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="svg">SVG</option>
            <option value="webp">WebP</option>
          </select>
        </div>

        {(exportFormat === 'jpg' || exportFormat === 'webp') && (
          <div>
            <label htmlFor="quality" className="block text-xs font-medium text-gray-700 mb-1">
              质量: {Math.round(quality * 100)}%
            </label>
            <input
              id="quality"
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={exportLogo}
          disabled={isExporting}
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isExporting ? '导出中...' : `导出 ${exportFormat.toUpperCase()}`}
        </button>

        <button
          onClick={exportAllFormats}
          disabled={isExporting}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isExporting ? '导出中...' : '批量导出所有格式'}
        </button>
      </div>
    </div>
  );
};
