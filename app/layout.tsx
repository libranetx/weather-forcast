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
  title: "Weather Forecast | Modern",
  description: "A modern weather forecasting application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        {/* Modern gradient background */}
        <div className="fixed inset-0 -z-10 bg-gradient-modern">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
          
          {/* Blue accent shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>

        {/* Main content */}
        <main className="min-h-screen relative z-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 text-center border-t border-border">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground">
              Weather Forecast • Modern UI • Data updates every 15 minutes
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}