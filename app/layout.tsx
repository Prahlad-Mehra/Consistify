import {Toaster} from "sonner";
import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

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
        <body className={`h-full`}>
          <Toaster position="bottom-center"/>
          {children}
        </body>
      </html>
    </ClerkProvider>
    
  );
}
