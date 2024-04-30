import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/components/header/header.component";
import Footer from "@/components/footer/footer.component";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joy Quote",
  description: "Joy Quote for coding test <3",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["joy-quote", "joy-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#4f1df4" }],
  authors: [
    { name: "Aiden" },
    {
      name: "Aiden",
      url: "https://www.linkedin.com/in/aidenhtut/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "apple-touch-icon.png" },
    { rel: "icon", url: "apple-touch-icon.png" },
  ],

};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          <Suspense fallback="loading ...">
            {children}
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
