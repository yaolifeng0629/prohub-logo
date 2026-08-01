'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { ExportModal } from './ExportModal';

export const ExportControls: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="export-control">
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="export-button"
      >
        <Download size={17} strokeWidth={2.25} aria-hidden="true" />
        <span>导出</span>
      </button>

      <ExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
