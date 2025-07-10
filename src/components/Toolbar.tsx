'use client';

import React, { useState } from 'react';
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
        <div className="w-full">
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between">
                {/* Left: Quick Presets */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-800">快速预设:</span>
                    <div className="flex space-x-1">
                        {quickPresets.map((preset, index) => (
                            <button
                                key={index}
                                onClick={() => applyPreset(preset)}
                                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition-colors"
                            >
                                {preset.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Center: Scale and Size Controls */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">缩放:</span>
                        <select
                            value={scale}
                            onChange={e => onScaleChange?.(parseFloat(e.target.value))}
                            className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                        >
                            {scaleOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="text-sm text-gray-700">
                        {config.logoSize.width} × {config.logoSize.height} px
                    </div>
                </div>

                {/* Right: Tools and Export */}
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={undo}
                            disabled={!canUndo()}
                            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            title="撤销 (Ctrl+Z)"
                        >
                            ↶
                        </button>

                        <button
                            onClick={redo}
                            disabled={!canRedo()}
                            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            title="重做 (Ctrl+Y)"
                        >
                            ↷
                        </button>

                        <button
                            onClick={resetConfig}
                            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                            title="重置所有设置"
                        >
                            🔄
                        </button>
                    </div>

                    {/* Export Button */}
                    <div className="border-l border-gray-300 pl-3">
                        <ExportControls />
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-3">
                {/* Top Row: Scale, Size, and Export */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">缩放:</span>
                            <select
                                value={scale}
                                onChange={e => onScaleChange?.(parseFloat(e.target.value))}
                                className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 min-w-[80px]"
                            >
                                {scaleOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="text-sm text-gray-600 hidden sm:block">
                            {config.logoSize.width} × {config.logoSize.height} px
                        </div>
                    </div>

                    <ExportControls />
                </div>

                {/* Bottom Row: Tools and Presets */}
                <div className="flex items-center justify-between">
                    {/* Left: Action Tools */}
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={undo}
                            disabled={!canUndo()}
                            className="p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                            title="撤销"
                        >
                            ↶
                        </button>

                        <button
                            onClick={redo}
                            disabled={!canRedo()}
                            className="p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                            title="重做"
                        >
                            ↷
                        </button>

                        <button
                            onClick={resetConfig}
                            className="p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md touch-manipulation"
                            title="重置"
                        >
                            🔄
                        </button>
                    </div>

                    {/* Right: Preset Toggle */}
                    <div className="relative">
                        <button
                            onClick={() => setShowPresets(!showPresets)}
                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors touch-manipulation"
                        >
                            预设 {showPresets ? '▲' : '▼'}
                        </button>

                        {/* Preset Dropdown */}
                        {showPresets && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                <div className="p-2 space-y-1">
                                    {quickPresets.map((preset, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                applyPreset(preset);
                                                setShowPresets(false);
                                            }}
                                            className="w-full px-3 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 rounded transition-colors touch-manipulation"
                                        >
                                            {preset.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Size info for very small screens */}
                <div className="sm:hidden text-center">
                    <span className="text-xs text-gray-500">
                        {config.logoSize.width} × {config.logoSize.height} px
                    </span>
                </div>
            </div>
        </div>
    );
};
