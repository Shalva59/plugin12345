import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import "./globals.css";
import { LanguageProvider } from "../../lib/language-context";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
      >
        {/* ✅ ThemeProvider დაემატა */}
          <LanguageProvider>
            <Navigation />      {/* ✅ Header */}
            {children}          {/* ✅ Page content */}
            <Footer />          {/* ✅ Footer */}
            <Analytics />
          </LanguageProvider>
      </body>
    </html>
  );
}
