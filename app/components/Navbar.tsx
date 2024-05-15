'use client'

import { ModeSwitch1 } from "./ModeSwitch"
import { useRef } from "react";
import CreateResume from "./CreateResume";
import Link from "next/link";
import { useAppTheme } from "../context/AppTheme";




const Navbar = () => {

    const modalRef = useRef<HTMLDialogElement>(null);
    const {openSans, robotoMono} = useAppTheme()

    return (
        <>
            <header className="absolute inset-0 h-fit py-3 min-w-full px-4 md:px-10 lg:px-16 xl:px-36 2xl:px-44 flex flex-wrap items-center justify-between z-40">
                <nav style={openSans.style} className="text-2xl 2xl:text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 bg-clip-text">
                    <Link href={'/'}>GitScan</Link>
                </nav>
                <div className="mr-12 md:mr-8 lg:mr-0">
                    <button onClick={() => modalRef.current?.showModal()} style={robotoMono.style} className="text-xs mt-1 leading-7 font-semibold px-2 md:px-3 py-1 dark:bg-slate-700/30 bg-slate-300/40 rounded-lg text-slate-700 dark:text-slate-300">Craft My Resume</button>
                </div>
            </header>
            <ModeSwitch1 />
            <CreateResume modalRef={modalRef} />
        </>
    )
}

export default Navbar