import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { inter, spaceGrotesk } from "@/configs/fonts";
import Providers from "@/providers/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";
import { ComingSoon } from "@/components/ComingSoon/ComingSoon";
import { EXECUTION_TIMESTAMP } from "@/configs/constants";

export const metadata: Metadata = {
  title: "Aave Umbrella",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  // TODO: remove after launch
  if (Date.now() < EXECUTION_TIMESTAMP * 1000) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={`font-sans ${inter.variable} ${spaceGrotesk.variable} border-main-950 dark:border-main-500 text-main-950 dark:bg-main-950 antialiased dark:text-white`}
        >
          <ComingSoon />
          <Analytics />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "development" && (
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
        )}
      </head>
      <body
        className={`font-sans ${inter.variable} ${spaceGrotesk.variable} border-main-950 dark:border-main-500 text-main-950 dark:bg-main-950 antialiased dark:text-white`}
      >
        <Providers>
          <div className="Root flex min-h-screen flex-col justify-between sm:px-7">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
