import type { LogoConfig } from '@/store/logoStore';

export type RasterExportFormat = 'png' | 'jpg' | 'webp';

interface LogoLayout {
  leftTextWidth: number;
  rightBoxWidth: number;
  rightBoxHeight: number;
  rightBoxX: number;
  rightBoxY: number;
  rightTextX: number;
  centerY: number;
  startX: number;
}

const RIGHT_BOX_PADDING = 12;

const getLayout = (
  ctx: CanvasRenderingContext2D,
  config: LogoConfig,
  width: number,
  height: number
): LogoLayout => {
  ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;

  const leftTextWidth = ctx.measureText(config.leftText).width;
  const rightTextWidth = ctx.measureText(config.rightText).width;
  const rightBoxWidth = rightTextWidth + RIGHT_BOX_PADDING * 2;
  const rightBoxHeight = config.fontSize + RIGHT_BOX_PADDING * 2;
  const totalWidth = leftTextWidth + config.spacing + rightBoxWidth;
  const startX = (width - totalWidth) / 2;
  const centerY = height / 2;
  const rightBoxX = startX + leftTextWidth + config.spacing;
  const rightBoxY = centerY - rightBoxHeight / 2;

  return {
    leftTextWidth,
    rightBoxWidth,
    rightBoxHeight,
    rightBoxX,
    rightBoxY,
    rightTextX: rightBoxX + RIGHT_BOX_PADDING,
    centerY,
    startX,
  };
};

const fillRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  if (safeRadius <= 0) {
    ctx.fillRect(x, y, width, height);
    return;
  }

  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, safeRadius);
    ctx.fill();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.fill();
};

export const drawLogo = (
  ctx: CanvasRenderingContext2D,
  config: LogoConfig,
  format: RasterExportFormat = 'png'
) => {
  const { width, height } = ctx.canvas;
  const layout = getLayout(ctx, config, width, height);

  ctx.clearRect(0, 0, width, height);

  if (!config.transparentBackground || format !== 'png') {
    ctx.fillStyle = config.overallBackgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.fillStyle = config.backgroundColor;
  fillRoundedRect(
    ctx,
    layout.rightBoxX,
    layout.rightBoxY,
    layout.rightBoxWidth,
    layout.rightBoxHeight,
    config.borderRadius
  );

  ctx.textBaseline = 'middle';
  ctx.fillStyle = config.leftTextColor;
  ctx.fillText(config.leftText, layout.startX, layout.centerY);
  ctx.fillStyle = config.rightTextColor;
  ctx.fillText(config.rightText, layout.rightTextX, layout.centerY);
};

export const createLogoCanvas = (config: LogoConfig, format: RasterExportFormat = 'png') => {
  const canvas = document.createElement('canvas');
  canvas.width = config.logoSize.width;
  canvas.height = config.logoSize.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Cannot get canvas context');
  }

  drawLogo(ctx, config, format);
  return canvas;
};

const escapeSvg = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const createLogoSvg = (config: LogoConfig) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Cannot get canvas context');
  }

  const { width, height } = config.logoSize;
  const layout = getLayout(ctx, config, width, height);
  const background = !config.transparentBackground
    ? `<rect width="100%" height="100%" fill="${escapeSvg(config.overallBackgroundColor)}"/>`
    : '';

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${background}
  <rect x="${layout.rightBoxX}" y="${layout.rightBoxY}" width="${layout.rightBoxWidth}" height="${layout.rightBoxHeight}" fill="${escapeSvg(config.backgroundColor)}" rx="${Math.min(config.borderRadius, layout.rightBoxWidth / 2, layout.rightBoxHeight / 2)}"/>
  <text x="${layout.startX}" y="${layout.centerY}" font-family="${escapeSvg(config.fontFamily)}" font-size="${config.fontSize}" font-weight="${config.fontWeight}" fill="${escapeSvg(config.leftTextColor)}" dominant-baseline="middle">${escapeSvg(config.leftText)}</text>
  <text x="${layout.rightTextX}" y="${layout.centerY}" font-family="${escapeSvg(config.fontFamily)}" font-size="${config.fontSize}" font-weight="${config.fontWeight}" fill="${escapeSvg(config.rightTextColor)}" dominant-baseline="middle">${escapeSvg(config.rightText)}</text>
</svg>`;
};
