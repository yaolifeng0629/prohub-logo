'use client';

import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { useLogoStore } from '@/store/logoStore';
import { createLogoCanvas, createLogoSvg } from '@/lib/logo-renderer';

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

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isExporting) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExporting, onClose]);

  if (!isOpen) return null;

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
          const svgContent = createLogoSvg(config);
          const blob = new Blob([svgContent], { type: 'image/svg+xml' });
          downloadFile(blob, `${filename}.svg`);
        } else {
          const canvas = createLogoCanvas(config, format);
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
    <div className="export-modal-backdrop">
      <div className="export-modal" role="dialog" aria-modal="true" aria-labelledby="export-modal-title">
        <div className="export-modal-header">
          <div>
            <h2 id="export-modal-title">导出 Logo</h2>
            <p>选择所需格式，文件将直接下载到设备。</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
            aria-label="关闭导出窗口"
            title="关闭"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="export-modal-content">
          <fieldset className="format-fieldset">
            <legend>选择导出格式</legend>
            <div className="format-options">
              {formatOptions.map((option) => (
                <label key={option.value} className="format-option">
                  <input
                    id={`export-${option.value}`}
                    type="checkbox"
                    checked={selectedFormats.includes(option.value)}
                    onChange={() => handleFormatToggle(option.value)}
                    className="format-checkbox"
                  />
                  <div className="format-copy">
                    <span>{option.label}</span>
                    <small>{option.description}</small>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          {(selectedFormats.includes('jpg') || selectedFormats.includes('webp')) && (
            <div className="quality-control">
              <label htmlFor="quality" className="range-label">
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
                className="control-range"
              />
            </div>
          )}
        </div>

        <div className="export-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="secondary-button"
          >
            取消
          </button>
          <button
            type="button"
            onClick={exportSelectedFormats}
            disabled={isExporting || selectedFormats.length === 0}
            className="primary-button"
          >
            <Download size={17} aria-hidden="true" />
            {isExporting ? '导出中...' : `导出 ${selectedFormats.length} 种格式`}
          </button>
        </div>
      </div>
    </div>
  );
};
