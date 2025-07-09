import {Toaster} from "sonner"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consistify",
  description: "Make yourself consistent with Consistify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth h-full">
        <body className={`${geistSans.variable} ${geistMono.variable} h-full`}>
          <Toaster position="bottom-center"/>
          {children}
        </body>
      </html>
    </ClerkProvider>
    
  );
}
