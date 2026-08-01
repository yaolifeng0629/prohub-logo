'use client';

import React from 'react';
import { TextControls } from './TextControls';
import { ColorControls } from './ColorControls';
import { SizeControls } from './SizeControls';
// import { ActionControls } from './ActionControls';

export const ControlPanel: React.FC = () => {
  return (
    <div className="control-panel">
      <div className="control-panel-header">
        <div>
          <h1>ProHub Logo 生成器</h1>
          <p>即时调整文字、颜色、字型与画布尺寸。</p>
        </div>
      </div>

      <div className="control-panel-scroll">
        <section className="control-section" aria-labelledby="text-controls-heading">
          <TextControls />
        </section>
        <section className="control-section" aria-labelledby="color-controls-heading">
          <ColorControls />
        </section>
        <section className="control-section" aria-labelledby="size-controls-heading">
          <SizeControls />
        </section>
      </div>
    </div>
  );
};
