'use client'

import Lottie from "lottie-react"
import noUser from "@/public/assets/noUser.json";
import { useAppTheme } from "../context/AppTheme";

export default function User() {

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://gitscan.vercel.app'
    const {robotoMono, inter, monsterRat} = useAppTheme();
    return (
        <main className='relative min-h-screen flex flex-col justify-center items-center overflow-hidden p-16'>
            <Lottie animationData={noUser} className='h-96' />
            <p style={robotoMono.style} className="text-xl text-slate-800 dark:text-slate-200">Unable to create Github resume, Username is missing in the URL</p>
            <p style={inter.style} className="mt-8 text-sm text-slate-700 dark:text-slate-300">Correct URL will be look like</p>
            <p style={monsterRat.style} className="mt-2 text-sm dark:text-blue-300 text-blue-500">{`${origin}/resume/GITHUB-USER-NAME`}</p>
        </main>
    )
}
