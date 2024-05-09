'use client'

import errorGif from "@/public/assets/error.json";
import Lottie from "lottie-react";
import { useAppTheme } from "./context/AppTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props { error: Error, reset: () => void }

export default function ErrorBoundary({ error, reset }: props) {
    const { robotoMono} = useAppTheme()
    const pathname = usePathname()

    return (
        <main className="relative text-gray-800 dark:text-gray-300 flex flex-col min-w-full min-h-screen justify-center items-center p-12">
            <Lottie animationData={errorGif} className="h-64 xl:h-80" />
            <p style={robotoMono.style} className="mt-12 text-xl">{error.message}</p>
            <Link href={'/'} className="mt-16 text-sm capitalize bg-blue-500 dark:bg-blue-600 text-white dark:text-blue-100 px-4 py-2 rounded-md ring-2 ring-blue-400 shadow-md shadow-blue-300">{pathname.includes('resume') ? 'Find Another User': "Home"}</Link>
        </main>
    )
}
