import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Script from "next/script";
import { getCurrentTheme } from "@/services";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tunnel charge online",
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
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5DLTHKZ3');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DLTHKZ3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
