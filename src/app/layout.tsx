import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "blogs",
    "blog",
    "personal",
    "personal blog",
    "blogging",
    "blogx"
  ],
  creator: "Shashivadan99",
  publisher: "Shashivadan99",
  authors: [ {
    name : "Shashivadan99",
    url : "https://shashivadan.xyz"
  }],
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "Shashivadan99",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  icons: {
    icon: `${siteConfig.url}/favicon.ico`,
    shortcut: `${siteConfig.url}/favicon-16x16.png`,
    apple: `${siteConfig.url}/apple-touch-icon.png`,
    other: {
      rel: "icon",
      url: `${siteConfig.url}/favicon.ico`,
    },
  }
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }:RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
