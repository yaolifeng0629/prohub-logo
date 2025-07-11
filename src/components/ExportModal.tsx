'use client';

import React, { useState } from 'react';
import { useLogoStore } from '@/store/logoStore';

type ExportFormat = 'png' | 'jpg' | 'svg' | 'webp';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { config } = useLogoStore();
  const [selectedFormats, setSelectedFormats] = useState<ExportFormat[]>(['png']);
  const [quality, setQuality] = useState(0.9);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const createCanvas = (format: ExportFormat): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = config.logoSize.width;
    canvas.height = config.logoSize.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get canvas context');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw overall background
    if (!config.transparentBackground || format !== 'png') {
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

    // Set text baseline for both texts
    ctx.textBaseline = 'middle';

    // Draw left text
    ctx.fillStyle = config.leftTextColor;
    ctx.fillText(config.leftText, startX, centerY);

    // Draw right text (centered within the right box)
    ctx.fillStyle = config.rightTextColor;
    const rightTextX = rightBoxX + rightBoxPadding;
    const rightTextY = rightBoxY + rightBoxHeight / 2;
    ctx.fillText(config.rightText, rightTextX, rightTextY);

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
    const rightTextY = rightBoxY + rightBoxHeight / 2;

    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${!config.transparentBackground ? `<rect width="100%" height="100%" fill="${config.overallBackgroundColor}"/>` : ''}
        <rect x="${rightBoxX}" y="${rightBoxY}" width="${rightBoxWidth}" height="${rightBoxHeight}"
              fill="${config.backgroundColor}" rx="${config.borderRadius}"/>
        <text x="${startX}" y="${centerY}" font-family="${config.fontFamily}" font-size="${config.fontSize}"
              font-weight="${config.fontWeight}" fill="${config.leftTextColor}" dominant-baseline="middle">
          ${config.leftText}
        </text>
        <text x="${rightTextX}" y="${rightTextY}" font-family="${config.fontFamily}" font-size="${config.fontSize}"
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

  const handleFormatToggle = (format: ExportFormat) => {
    setSelectedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const exportSelectedFormats = async () => {
    if (selectedFormats.length === 0) {
      alert('请至少选择一种导出格式');
      return;
    }

    setIsExporting(true);

    try {
      const filename = `${config.leftText}${config.rightText}-logo`;

      for (const format of selectedFormats) {
        if (format === 'svg') {
          const svgContent = createSVG();
          const blob = new Blob([svgContent], { type: 'image/svg+xml' });
          downloadFile(blob, `${filename}.svg`);
        } else {
          const canvas = createCanvas(format);
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

      // Close modal after successful export
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const formatOptions = [
    { value: 'png' as ExportFormat, label: 'PNG', description: '透明背景支持' },
    { value: 'jpg' as ExportFormat, label: 'JPG', description: '小文件大小' },
    { value: 'svg' as ExportFormat, label: 'SVG', description: '矢量格式' },
    { value: 'webp' as ExportFormat, label: 'WebP', description: '现代格式' },
  ];

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50 p-4">
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">导出 Logo</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              选择导出格式
            </label>
            <div className="space-y-3">
              {formatOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(option.value)}
                    onChange={() => handleFormatToggle(option.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">{option.label}</span>
                    <span className="text-xs text-gray-500 ml-2">{option.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {(selectedFormats.includes('jpg') || selectedFormats.includes('webp')) && (
            <div>
              <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
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

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            取消
          </button>
          <button
            onClick={exportSelectedFormats}
            disabled={isExporting || selectedFormats.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? '导出中...' : `导出 (${selectedFormats.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};
