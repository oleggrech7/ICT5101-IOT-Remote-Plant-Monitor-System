import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interFontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ICT5101 - Internet of Things: Remote Plant Monitor System",
  description:
    "Frontend application to display plant data from a remote monitor system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          interFontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
