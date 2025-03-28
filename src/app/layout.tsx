import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  LuPanelLeft,
  LuArrowRightLeft,
  LuArrowRightFromLine,
} from "react-icons/lu";

import { IconButton } from "@/components/icon-button";
import { Providers } from "./providers";

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
          <nav className="flex justify-between items-center">
            <IconButton
              className="bg-fuchsia-200 hover:bg-fuchsia-100 text-fuchsia-900"
              icon={<LuPanelLeft />}
            />
            <div className="space-x-3">
              <IconButton
                className="bg-fuchsia-200 hover:bg-fuchsia-100 text-fuchsia-900"
                icon={<LuArrowRightLeft />}
              />
              <IconButton
                className="bg-fuchsia-200 hover:bg-fuchsia-100 text-fuchsia-900"
                icon={<LuArrowRightFromLine />}
              />
            </div>
          </nav>
          {children}
        </body>
      </Providers>
    </html>
  );
}
