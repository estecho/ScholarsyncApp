import type { Metadata, Viewport } from "next";
import "./globals.css";
import PortalDebugScript from "./PortalDebugScript";
import { NavProvider } from "@/contexts/NavContext";
import BottomNav from "@/components/BottomNav";
import SearchOverlay from "@/components/chat/SearchOverlay";

export const metadata: Metadata = {
  title: "ScholarSync - Your AI Academic Companion",
  description: "ScholarSync 校园生活 Web App",
};

export const viewport: Viewport = {
  width: "430",
  initialScale: 1.0,
  maximumScale: 1.0,
  minimumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="light">
      <head>
        <meta
          name="viewport"
          content="width=430, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-[100dvh] max-w-[100vw] overflow-x-hidden">
        <NavProvider>
          <main className="pb-24 max-w-[100vw] overflow-x-hidden">
            {children}
          </main>
          <BottomNav />
          <SearchOverlay />
          <PortalDebugScript />
        </NavProvider>
      </body>
    </html>
  );
}


