'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { PreviewPanel } from '@/components/PreviewPanel';
import { ControlPanel } from '@/components/ControlPanel';
import { Toolbar } from '@/components/Toolbar';
import { LogoConfig, useLogoStore } from '@/store/logoStore';
import { createLogoCanvas } from '@/lib/logo-renderer';

export default function Home() {
  const { undo, redo, config } = useLogoStore();
  const [comparisonConfig, setComparisonConfig] = useState<LogoConfig | null>(null);

  // Quick export function
  const quickExport = useCallback(() => {
    const canvas = createLogoCanvas(config);

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
  }, [config]);

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
  }, [undo, redo, config, quickExport]);

  return (
    <main className="logo-app">
      <section className="workspace" aria-label="Logo preview workspace">
        <header className="toolbar-shell">
          <div className="brand-lockup" aria-label="ProHub Logo Studio">
            <span className="brand-mark" aria-hidden="true">
              {/* 内联 SVG 品牌标不需要 next/image 优化 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" width="29" height="29" />
            </span>
            <span className="brand-copy">
              <strong>PROHUB</strong>
              <small>Logo Studio</small>
            </span>
          </div>
          <Toolbar onComparisonChange={setComparisonConfig} />
        </header>

        <div className="preview-shell">
          <PreviewPanel scale={1} comparisonConfig={comparisonConfig ?? undefined} />
        </div>

        <footer className="workspace-footer">
          <p>
            Crafted by{' '}
            <a href="https://yaolifeng.com" target="_blank" rel="noopener noreferrer">
              yaolifeng
            </a>
            <span aria-hidden="true"> · </span>
            <span>ProHub Logo Studio</span>
          </p>
        </footer>
      </section>

      <aside className="editor-shell" aria-label="Logo editor controls">
        <ControlPanel />
      </aside>
    </main>
  );
}
