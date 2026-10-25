import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

// Variable font with the opsz axis: large sizes render as Inter Display
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  adjustFontFallback: false,
  fallback: [],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  // Not used by the LCP hero text; keep it off the critical preload path
  preload: false,
});

export const metadata: Metadata = {
  title: "ProHub Logo 生成器 - 免费在线 Logo 制作工具",
  description: "免费的在线 ProHub Logo 生成器，支持自定义文字、颜色、字体和尺寸。支持 PNG、JPG、SVG、WebP 格式导出，无需注册即可使用。",
  keywords: "Logo生成器, ProHub, 在线制作, 免费Logo, PNG导出, SVG导出",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "ProHub Logo 生成器",
    description: "免费的在线 ProHub Logo 生成器，支持自定义文字、颜色、字体和尺寸。",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#111111",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`dark ${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
