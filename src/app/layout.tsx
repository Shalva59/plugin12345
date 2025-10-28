import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import "./globals.css";
import { LanguageProvider } from "../../lib/language-context";
import Script from "next/script"; // ✅ დამატებულია Tawk.to-სთვის

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
        <LanguageProvider>
          <Navigation />      {/* ✅ Header */}
          {children}          {/* ✅ Page content */}
          <Footer />          {/* ✅ Footer */}
          <Analytics />
        </LanguageProvider>

        {/* ✅ Tawk.to ჩატის კოდი */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/68f775260cfb8619514cee31/1j83a380s';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
