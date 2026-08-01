import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#1b1c1a",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          id="impeccable-direction-contract"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              thesis: 'A focused identity workbench with the live mark as the only hero, not a generic settings sidebar.',
              world: 'Graphite studio field, paper editor surface, coral operational accent, and preview-led preset rails.',
              story: 'Visitors compose a two-part mark, compare its live canvas, then export the exact file they need.',
              firstViewport: 'Desktop holds the staged logo canvas and full editor together; mobile keeps the canvas visible above a compact command strip.',
              form: 'Candidate 3, identity preset rail with focus states; seed 50722f76.',
              finish: 'unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md',
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
