"use client"

import searchUser from "@/public/assets/search.json";
import Lottie from 'lottie-react';
import { useAppTheme } from "../context/AppTheme";
import SearchUser from "./SearchUser";
import { useRef } from "react";
import CreateResume from "./CreateResume";


const NoUser = () => {

    const { openSans, inter, monsterRat, robotoMono } = useAppTheme()
    const modalRef = useRef<HTMLDialogElement>(null);

    return (
        <section className="flex items-center justify-center flex-col-reverse md:flex-row mx-4 md:mx-10 lg:mx-16 xl:mx-36 2xl:mx-44">
            <div className="text-center md:text-left">
                <h2 style={inter.style} className="capitalize text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500">discover github User Like never before</h2>
                <h4 style={monsterRat.style} className="text-2xl md:text-4xl  text-slate-700 dark:text-blue-200 font-semibold mt-4 lg:mt-0">Powering</h4>
                <h4 style={monsterRat.style} className="text-2xl md:text-4xl  text-slate-700 dark:text-blue-200 font-semibold">Discovery</h4>
                <h4 style={monsterRat.style} className="text-2xl md:text-4xl  text-slate-700 dark:text-blue-200 font-semibold">For your world</h4>
                <div className="">
                    <div className="my-8 flex lg:hidden items-center justify-center md:justify-start ">
                        <SearchUser setUser={() => { }} />
                    </div>
                    <div style={robotoMono.style} className="hidden lg:flex items-center justify-start my-8 ">
                        <div className="font-semibold px-2 py-1 text-slate-800 dark:text-slate-300 bg-slate-300 dark:bg-slate-800 ring-2 ring-slate-400 dark:ring-slate-600 rounded-lg shadow-md shadow-slate-900 dark:shadow-slate-400">
                            <span className="animate-pulse">ctrl</span>
                        </div>
                        <span className="mx-2 font-bold">+</span>
                        <div className="font-semibold px-3 py-1 text-slate-800 dark:text-slate-300 bg-slate-300 dark:bg-slate-800 ring-2 ring-slate-400 dark:ring-slate-600 rounded-lg shadow-md shadow-slate-900 dark:shadow-slate-400">
                            <span className="animate-pulse">k</span>
                        </div>
                        <span style={inter.style} className="ml-2 dark:text-blue-300">To search any Github user.</span>
                    </div>
                    <div className="w-full flex flex-col items-center md:items-start">
                        <h3 style={openSans.style} className="text-xl lg:text-lg font-semibold text-slate-700 dark:text-slate-300 max-w-96">Let Your GitHub Stats Speak: Create a Resume That Gets Noticed 📃 </h3>
                        <button onClick={() => modalRef.current?.showModal()} className="relative inline-flex h-14 w-fit overflow-hidden rounded-full p-[1px] focus:outline-none mt-6 ">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0ea5e9_0%,#7dd3fc_50%,#3b82f6_100%)]" />
                            <span style={robotoMono.style} className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-200/75 dark:bg-slate-800/85 px-3 text-sm font-semibold text-blue-600 dark:text-slate-300 backdrop-blur-3xl">
                                Craft my Resume 🤖
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <CreateResume modalRef={modalRef}/>
            <Lottie animationData={searchUser} className='h-80 md:h-96 lg:h-[32rem]' />
        </section>
    )

}

export default NoUser