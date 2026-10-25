'use client';

import React, { useState } from 'react';
import { ChevronDown, Columns2, Redo2, RotateCcw, Undo2 } from 'lucide-react';
import { LogoConfig, useLogoStore } from '@/store/logoStore';
import { ExportControls } from './ExportControls';

interface ToolbarProps {
    onComparisonChange?: (config: LogoConfig | null) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onComparisonChange }) => {
    const { config, updateConfig, resetConfig, undo, redo, canUndo, canRedo } = useLogoStore();
    const [showPresets, setShowPresets] = useState(false);
    const [previousConfig, setPreviousConfig] = useState<LogoConfig | null>(null);
    const [isComparing, setIsComparing] = useState(false);

    const quickPresets = [
        {
            name: '经典橙色',
            config: {
                leftText: 'Pro',
                rightText: 'Hub',
                backgroundColor: '#D25611',
                leftTextColor: '#FAFAFA',
                rightTextColor: '#FFFFFF',
                overallBackgroundColor: '#111111',
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
        setPreviousConfig(config);
        clearComparison();
        updateConfig(preset.config);
    };

    const clearComparison = () => {
        setIsComparing(false);
        onComparisonChange?.(null);
    };

    const toggleComparison = () => {
        if (!previousConfig) return;

        const nextComparing = !isComparing;
        setIsComparing(nextComparing);
        onComparisonChange?.(nextComparing ? previousConfig : null);
    };

    const handleUndo = () => {
        clearComparison();
        undo();
    };

    const handleRedo = () => {
        clearComparison();
        redo();
    };

    const handleReset = () => {
        clearComparison();
        setPreviousConfig(null);
        resetConfig();
    };

    const isPresetActive = (preset: (typeof quickPresets)[0]) => (
        config.leftText === preset.config.leftText
        && config.rightText === preset.config.rightText
        && config.backgroundColor === preset.config.backgroundColor
        && config.leftTextColor === preset.config.leftTextColor
        && config.rightTextColor === preset.config.rightTextColor
        && config.overallBackgroundColor === preset.config.overallBackgroundColor
    );

    return (
        <div className="toolbar">
            <div className="toolbar-presets" aria-label="快速预设">
                <div className="preset-list">
                    {quickPresets.map((preset) => (
                        <button
                            key={preset.name}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            className={`preset-button ${isPresetActive(preset) ? 'is-active' : ''}`}
                            aria-pressed={isPresetActive(preset)}
                        >
                            <span className="preset-thumbnail" style={{ backgroundColor: preset.config.overallBackgroundColor }} aria-hidden="true">
                                <span className="preset-thumbnail-left" style={{ color: preset.config.leftTextColor }}>P</span>
                                <span className="preset-thumbnail-right" style={{ backgroundColor: preset.config.backgroundColor, color: preset.config.rightTextColor }}>H</span>
                            </span>
                            <span className="preset-copy">{preset.name}</span>
                        </button>
                    ))}
                    {previousConfig && (
                        <button
                            type="button"
                            onClick={toggleComparison}
                            className={`compare-button ${isComparing ? 'is-active' : ''}`}
                            aria-pressed={isComparing}
                            title={isComparing ? '显示当前方案' : '对照原始方案'}
                        >
                            <Columns2 size={15} aria-hidden="true" />
                            <span>{isComparing ? '显示当前' : '对照原方案'}</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="toolbar-actions">
                <div className="history-actions" aria-label="History controls">
                    <button type="button" onClick={handleUndo} disabled={!canUndo()} className="icon-button" aria-label="撤销" title="撤销 (Ctrl+Z)">
                        <Undo2 size={17} strokeWidth={2} />
                    </button>
                    <button type="button" onClick={handleRedo} disabled={!canRedo()} className="icon-button" aria-label="重做" title="重做 (Ctrl+Y)">
                        <Redo2 size={17} strokeWidth={2} />
                    </button>
                    <button type="button" onClick={handleReset} className="icon-button" aria-label="重置所有设置" title="重置所有设置">
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
                                    className={`preset-menu-item ${isPresetActive(preset) ? 'is-active' : ''}`}
                                >
                                    <span className="preset-thumbnail" style={{ backgroundColor: preset.config.overallBackgroundColor }} aria-hidden="true">
                                        <span className="preset-thumbnail-left" style={{ color: preset.config.leftTextColor }}>P</span>
                                        <span className="preset-thumbnail-right" style={{ backgroundColor: preset.config.backgroundColor, color: preset.config.rightTextColor }}>H</span>
                                    </span>
                                    {preset.name}
                                </button>
                            ))}
                            {previousConfig && (
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                        toggleComparison();
                                        setShowPresets(false);
                                    }}
                                    className={`compare-menu-item ${isComparing ? 'is-active' : ''}`}
                                >
                                    <Columns2 size={15} aria-hidden="true" />
                                    {isComparing ? '显示当前方案' : '对照原方案'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
