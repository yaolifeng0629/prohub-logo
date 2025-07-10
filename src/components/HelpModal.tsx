'use client';

import React, { useState } from 'react';

export const HelpModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 z-50"
        title="帮助"
      >
        ?
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">使用帮助</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">基本操作</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 在左侧面板中输入您想要的文字内容</li>
                <li>• 调整字体大小、粗细和字体族</li>
                <li>• 使用颜色选择器自定义各部分颜色</li>
                <li>• 设置 Logo 尺寸和圆角大小</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">快捷键</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>撤销:</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + Z</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>重做:</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + Y</kbd>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>快速导出:</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + S</kbd>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">导出功能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 支持 PNG、JPG、SVG、WebP 四种格式</li>
                <li>• PNG 格式支持透明背景</li>
                <li>• 可调整 JPG 和 WebP 的质量</li>
                <li>• 支持一键批量导出所有格式</li>
                <li>• 使用 Ctrl+S 快速导出 PNG 格式</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">预设样式</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 经典橙色：传统的橙黑配色方案</li>
                <li>• 现代蓝色：现代感的蓝色主题</li>
                <li>• 简约黑白：极简的黑白配色</li>
                <li>• 活力绿色：充满活力的绿色主题</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">预览功能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 实时预览所有修改</li>
                <li>• 支持 25% 到 200% 的缩放查看</li>
                <li>• 透明背景时显示网格便于查看</li>
                <li>• 显示当前 Logo 尺寸信息</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">技术特性</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 完全免费，无需注册</li>
                <li>• 所有处理都在浏览器本地完成</li>
                <li>• 支持撤销重做，最多保存历史记录</li>
                <li>• 响应式设计，支持移动设备</li>
              </ul>
            </section>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              关闭帮助
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
