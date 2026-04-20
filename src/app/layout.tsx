import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getCurrentTheme } from "@/services";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dartford crossing charge online",
  description: "Make payment before midnight the day after use.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getCurrentTheme();

  return (
    <html lang="en">
      <body
        style={
          {
            ["--background" as string]: theme.backgroundColor,
            ["--surface" as string]: "#f8fafc",
            ["--text-primary" as string]: theme.primaryColor,
            ["--text-secondary" as string]: theme.primaryColor,
            ["--button-primary" as string]: theme.buttonColor,
            ["--button-primary-hover" as string]: theme.buttonColor,
          } as CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
