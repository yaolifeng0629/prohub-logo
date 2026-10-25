'use client';

import React, { useState } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { ExportModal } from './ExportModal';

export const ExportControls: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="export-control">
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="export-button"
        aria-label="导出 Logo"
      >
        <span>导出</span>
        {/* slide-through swap: 箭头下滑离场，副本自上方落入（300ms） */}
        <span className="icon-swap" aria-hidden="true">
          <ArrowDownToLine size={16} strokeWidth={2.25} />
          <ArrowDownToLine size={16} strokeWidth={2.25} />
        </span>
      </button>

      <ExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
