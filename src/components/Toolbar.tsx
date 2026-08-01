'use client';

import React, { useState } from 'react';
import { ChevronDown, Redo2, RotateCcw, Undo2 } from 'lucide-react';
import { useLogoStore } from '@/store/logoStore';
import { ExportControls } from './ExportControls';

interface ToolbarProps {
    scale?: number;
    onScaleChange?: (scale: number) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ scale = 1, onScaleChange }) => {
    const { config, updateConfig, resetConfig, undo, redo, canUndo, canRedo } = useLogoStore();
    const [showPresets, setShowPresets] = useState(false);

    const scaleOptions = [
        { label: '25%', value: 0.25 },
        { label: '50%', value: 0.5 },
        { label: '75%', value: 0.75 },
        { label: '100%', value: 1 },
        { label: '150%', value: 1.5 },
        { label: '200%', value: 2 },
    ];

    const quickPresets = [
        {
            name: '经典橙色',
            config: {
                leftText: 'Pro',
                rightText: 'Hub',
                backgroundColor: '#FF8C00',
                leftTextColor: '#FFFFFF',
                rightTextColor: '#000000',
                overallBackgroundColor: '#000000',
            },
        },
        {
            name: '现代蓝色',
            config: {
                leftText: 'Pro',
                rightText: 'Hub',
                backgroundColor: '#3B82F6',
                leftTextColor: '#FFFFFF',
                rightTextColor: '#FFFFFF',
                overallBackgroundColor: '#1F2937',
            },
        },
        {
            name: '简约黑白',
            config: {
                leftText: 'Pro',
                rightText: 'Hub',
                backgroundColor: '#000000',
                leftTextColor: '#000000',
                rightTextColor: '#FFFFFF',
                overallBackgroundColor: '#FFFFFF',
            },
        },
        {
            name: '活力绿色',
            config: {
                leftText: 'Pro',
                rightText: 'Hub',
                backgroundColor: '#10B981',
                leftTextColor: '#FFFFFF',
                rightTextColor: '#000000',
                overallBackgroundColor: '#065F46',
            },
        },
    ];

    const applyPreset = (preset: (typeof quickPresets)[0]) => {
        updateConfig(preset.config);
    };

    return (
        <div className="toolbar">
            <div className="toolbar-presets" aria-label="Quick presets">
                <span className="toolbar-label">快速预设</span>
                <div className="preset-list">
                    {quickPresets.map((preset) => (
                        <button
                            key={preset.name}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            className="preset-button"
                        >
                            <span className="preset-swatch" style={{ backgroundColor: preset.config.backgroundColor }} aria-hidden="true" />
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="toolbar-view">
                <label className="toolbar-select-label" htmlFor="preview-scale">缩放</label>
                <select
                    id="preview-scale"
                    value={scale}
                    onChange={e => onScaleChange?.(parseFloat(e.target.value))}
                    className="toolbar-select"
                >
                    {scaleOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <output className="canvas-size" aria-label="Logo canvas size">
                    {config.logoSize.width} × {config.logoSize.height} px
                </output>
            </div>

            <div className="toolbar-actions">
                <div className="history-actions" aria-label="History controls">
                    <button type="button" onClick={undo} disabled={!canUndo()} className="icon-button" aria-label="撤销" title="撤销 (Ctrl+Z)">
                        <Undo2 size={17} strokeWidth={2} />
                    </button>
                    <button type="button" onClick={redo} disabled={!canRedo()} className="icon-button" aria-label="重做" title="重做 (Ctrl+Y)">
                        <Redo2 size={17} strokeWidth={2} />
                    </button>
                    <button type="button" onClick={resetConfig} className="icon-button" aria-label="重置所有设置" title="重置所有设置">
                        <RotateCcw size={17} strokeWidth={2} />
                    </button>
                </div>

                <ExportControls />

                <div className="preset-menu-wrap">
                    <button
                        type="button"
                        onClick={() => setShowPresets(!showPresets)}
                        className="preset-menu-button"
                        aria-expanded={showPresets}
                        aria-controls="mobile-preset-menu"
                    >
                        预设
                        <ChevronDown size={16} aria-hidden="true" className={showPresets ? 'is-open' : ''} />
                    </button>
                    {showPresets && (
                        <div id="mobile-preset-menu" className="preset-menu" role="menu">
                            {quickPresets.map((preset) => (
                                <button
                                    key={preset.name}
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                        applyPreset(preset);
                                        setShowPresets(false);
                                    }}
                                    className="preset-menu-item"
                                >
                                    <span className="preset-swatch" style={{ backgroundColor: preset.config.backgroundColor }} aria-hidden="true" />
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
