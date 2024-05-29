import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react"
import AppTheme from "./context/AppTheme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


interface props { children: ReactNode }

export default function RootLayout({ children }: props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-bl from-[#E0EAFC] to-[#CFDEF3] dark:from-slate-800 dark:to-slate-900">
        <AppTheme>
            <Navbar />
            {children}
            <Footer />
        </AppTheme>
      </body>
      <Analytics />
    </html>
  );
}

export const metadata: Metadata = {
  title: "GitScan",
  description: "GitScan is a powerful web application that allows you to explore GitHub user stats and generate shareable profiles resembling a resume. Dive into the coding activity, contributions, repositories, and more of any GitHub user. With GitScan, you can showcase your GitHub journey with SEO optimization to enhance your online presence and connect with the wider developer community.",
  authors: [{ name: 'Moinak Majumdar', url: 'https://www.linkedin.com/in/moinak-majumdar' }],
  creator: "Moinak Majumdar",
  publisher: "Vercel",
  metadataBase: new URL('https://gitscan.vercel.app/'),
  keywords: ['GitHub', 'user search', 'profile lookup', 'programming', 'developer', 'software', 'code', 'repository', 'API', 'search tool', 'open source', 'coding community'],
  openGraph: {
    type: 'website',
    title: "GitScan",
    description: "GitScan is a powerful web application that allows you to explore GitHub user stats and generate shareable profiles resembling a resume. Dive into the coding activity, contributions, repositories, and more of any GitHub user. With GitScan, you can showcase your GitHub journey with SEO optimization to enhance your online presence and connect with the wider developer community.",
    images: 'https://avatars.githubusercontent.com/u/99950805?v=4',
    url: new URL('https://gitscan.vercel.app/'),
  }
};
