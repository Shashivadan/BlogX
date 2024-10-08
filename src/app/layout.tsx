import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/lib/site";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["blogs", "blog", "personal", "personal blog", "blogging", "blogx"],
  creator: "Shashivadan99",
  publisher: "Shashivadan99",
  authors: [
    {
      name: "Shashivadan99",
      url: "https://hi.shashivadan.xyz",
    },
  ],
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "Shashivadan99",
  },
  icons: {
    icon: `./favicon/icon.svg`,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster richColors />
        <Header />
        <main className="mx-auto min-h-[calc(100vh-68px)] max-w-4xl px-8 pb-16 pt-24 ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
