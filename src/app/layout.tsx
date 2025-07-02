// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IronSeed - Generate HD Wallets (Solana, Ethereum, Bitcoin)",
  description:
    "IronSeed is a secure HD wallet generator supporting Solana, Ethereum, and Bitcoin. Easily generate wallets from mnemonics with a simple interface.",
  keywords: [
    "HD Wallet Generator",
    "Solana Wallet",
    "Ethereum Wallet",
    "Bitcoin Wallet",
    "Mnemonic Wallet",
    "IronSeed",
    "Web3",
    "Blockchain"
  ],
  metadataBase: new URL("https://abhijit.website"),
  openGraph: {
    title: "IronSeed - Generate HD Wallets",
    description:
      "Easily create HD wallets for Solana, Ethereum, and Bitcoin with IronSeed.",
    url: "https://wallet.abhijit.website",
    siteName: "IronSeed",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IronSeed - Generate HD Wallets",
    description:
      "Create secure blockchain wallets using mnemonic phrases. Supports Solana, Ethereum, and Bitcoin.",
    creator: "@Abhijit84520800",
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
