import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProHub Logo 生成器 - 免费在线 Logo 制作工具",
  description: "免费的在线 ProHub Logo 生成器，支持自定义文字、颜色、字体和尺寸。支持 PNG、JPG、SVG、WebP 格式导出，无需注册即可使用。",
  keywords: "Logo生成器, ProHub, 在线制作, 免费Logo, PNG导出, SVG导出",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
