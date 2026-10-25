'use client';

import React from 'react';
import { TextControls } from './TextControls';
import { ColorControls } from './ColorControls';
import { SizeControls } from './SizeControls';
import { ActionControls } from './ActionControls';

export const ControlPanel: React.FC = () => {
  return (
    <div className="control-panel">
      <div className="control-panel-header">
        <h1>编辑标记</h1>
        <p className="panel-meta">Mark Settings · Live</p>
      </div>

      <div className="control-panel-scroll">
        <section className="control-section" aria-labelledby="text-controls-heading">
          <TextControls sectionNumber={1} />
        </section>
        <section className="control-section" aria-labelledby="color-controls-heading">
          <ColorControls sectionNumber={2} />
        </section>
        <section className="control-section" aria-labelledby="size-controls-heading">
          <SizeControls sectionNumber={3} />
        </section>
        <section className="control-section shortcut-section" aria-label="快捷操作">
          <ActionControls sectionNumber={4} />
        </section>
      </div>
    </div>
  );
};
