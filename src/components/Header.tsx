'use client';

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ProHub Logo 生成器
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            免费的在线 Logo 制作工具，支持自定义文字、颜色、字体和尺寸。
            支持多种格式导出，无需注册即可使用。
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center">
              ✅ 完全免费
            </span>
            <span className="flex items-center">
              🎨 实时预览
            </span>
            <span className="flex items-center">
              📱 响应式设计
            </span>
            <span className="flex items-center">
              💾 多格式导出
            </span>
            <span className="flex items-center">
              🔒 本地处理
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
