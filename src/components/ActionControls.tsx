'use client';

import React from 'react';
import { CornerDownLeft, Redo2, Undo2 } from 'lucide-react';


export const ActionControls: React.FC = () => {
  return (
    <div className="shortcut-panel">
      <h2 className="section-title">快捷键</h2>

      <div className="shortcut-list">
        <div className="shortcut-row">
          <span><Undo2 size={15} aria-hidden="true" />撤销</span>
          <kbd>Ctrl + Z</kbd>
        </div>
        <div className="shortcut-row">
          <span><Redo2 size={15} aria-hidden="true" />重做</span>
          <kbd>Ctrl + Y</kbd>
        </div>
        <div className="shortcut-row">
          <span><CornerDownLeft size={15} aria-hidden="true" />快速导出</span>
          <kbd>Ctrl + S</kbd>
        </div>
      </div>
    </div>
  );
};
