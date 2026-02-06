import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Forecast App",
  description: "Real-time weather forecast application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased bg-background`}>
        {/* Animated gradient background */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-linear-to-br from-background via-background to-secondary/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-size-[24px_24px] opacity-20"></div>
          
          <div className="absolute top-1/4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
        </div>

        <main className="min-h-screen relative z-10 p-4 md:p-8">
          <div className="max-w-2xl mx-auto">
            {children}
          </div>
        </main>

        <footer className="relative z-10 text-center py-6">
          <p className="text-sm text-muted-foreground">
            Powered by shadcn/ui • Weather data is simulated
          </p>
        </footer>
      </body>
    </html>
  );
}