import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { TopNavbar } from "./top-navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <Providers>
        <body
          className={`${inter.variable} font-sans h-full bg-fuchsia-50 p-4 flex flex-col gap-y-3`}
        >
          <TopNavbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
