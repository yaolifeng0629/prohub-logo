'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { PreviewPanel } from '@/components/PreviewPanel';
import { ControlPanel } from '@/components/ControlPanel';
import { Toolbar } from '@/components/Toolbar';
import { useLogoStore } from '@/store/logoStore';
import { createLogoCanvas } from '@/lib/logo-renderer';

export default function Home() {
  const { undo, redo, config } = useLogoStore();
  const [scale, setScale] = useState(1);

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
          <Toolbar scale={scale} onScaleChange={setScale} />
        </header>

        <div className="preview-shell">
          <PreviewPanel scale={scale} />
        </div>

        <footer className="workspace-footer">
          <p>
            Made by{' '}
            <a href="https://yaolifeng.com" target="_blank" rel="noopener noreferrer">
              yaolifeng
            </a>
            <span aria-hidden="true"> · </span>
            <span>© 2025 ProHub Logo</span>
          </p>
        </footer>
      </section>

      <aside className="editor-shell" aria-label="Logo editor controls">
        <ControlPanel />
      </aside>
    </main>
  );
}
