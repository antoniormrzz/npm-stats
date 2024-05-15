import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./Header";
import { Footer } from "./Footer";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "npm stats By Antonio Ramirez",
  description: "See npm stats by user or package name",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <GoogleAnalytics gaId="G-J5LYZMN1XT" />
      <body className={inter.className}>
        <div>
          <Toaster />
        </div>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow flex w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
