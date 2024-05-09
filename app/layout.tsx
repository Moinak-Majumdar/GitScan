

import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import AppTheme from "./context/AppTheme";
import Navbar from "./components/Navbar";


interface props { children: ReactNode }

export default function RootLayout({ children }: props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-bl from-[#E0EAFC] to-[#CFDEF3] dark:from-slate-800 dark:to-slate-900">
        <AppTheme>
            <Navbar />
            {children}
        </AppTheme>
      
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "GitScan",
  description: "Welcome to GitScan – your gateway to the world of GitHub users. With just a name, unlock a treasure trove of information about developers like you! Dive into their projects, see what they're contributing to, and get inspired by their coding journey. Whether you're curious about someone's latest project or looking for collaborators, our tool makes it easy to connect with the vibrant community of developers on GitHub. Join us and explore the fascinating world of coding, one profile at a time!",
  authors: [{ name: 'Moinak Majumdar', url: 'https://www.linkedin.com/in/moinak-majumdar' }],
  creator: "Moinak Majumdar",
  publisher: "Vercel",
  metadataBase: new URL('https://gitscan.vercel.app/'),
  keywords: ['GitHub', 'user search', 'profile lookup', 'programming', 'developer', 'software', 'code', 'repository', 'API', 'search tool', 'open source', 'coding community'],
  openGraph: {
    type: 'website',
    title: "GitScan",
    description: "Welcome to GitScan – your gateway to the world of GitHub users. With just a name, unlock a treasure trove of information about developers like you! Dive into their projects, see what they're contributing to, and get inspired by their coding journey. Whether you're curious about someone's latest project or looking for collaborators, our tool makes it easy to connect with the vibrant community of developers on GitHub. Join us and explore the fascinating world of coding, one profile at a time!",
    images: 'https://avatars.githubusercontent.com/u/99950805?v=4',
    url: new URL('https://gitscan.vercel.app/'),
  }
};
