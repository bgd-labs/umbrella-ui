import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "@/providers/Providers";
import { PropsWithChildren } from "react";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { inter, spaceGrotesk } from "@/configs/fonts";

export const metadata: Metadata = {
  title: "Umbrella UI",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${inter.variable} ${spaceGrotesk.variable} border-main-950 dark:border-main-500 text-main-950 dark:bg-main-950 antialiased dark:text-white`}
      >
        <Providers>
          <div className="Root flex min-h-screen flex-col justify-between">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
