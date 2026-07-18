import { GFS_Didot, Inter } from "next/font/google";

export const didot = GFS_Didot({
  subsets: ["latin"],
  weight: "400",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
