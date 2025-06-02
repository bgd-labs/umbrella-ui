import { Inter, Space_Grotesk, Silkscreen } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700"],
});

export const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-countdown",
  weight: ["400"],
});
