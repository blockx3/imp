import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import "@repo/ui/css"; // This is needed only if the importing project is not using shadcn ui
import { Toaster } from "@/components/ui/toaster";
import ContextProviders from "@/components/ContextProviders";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "IMP",
  description: "A social platform where you can share your idea about anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ContextProviders>
          {children}
          <Toaster />
        </ContextProviders>
      </body>
    </html>
  );
}
