"use client"

import searchUser from "@/public/assets/search.json";
import Lottie from 'lottie-react';
import { useAppTheme } from "../context/AppTheme";


const NoUser = () => {

    const {openSans, inter ,monsterRat} = useAppTheme()

    return (
        <section className="flex items-center flex-col-reverse md:flex-row m-4 md:m-10 lg:m-16 xl:m-36 2xl:m-44">
            <div className="text-center md:text-left mt-16 md:mt-0">
                <h2 style={inter.style} className="capitalize text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 mb-10 md:mb-4">discover github User Like never before</h2>
                <h4 style={monsterRat.style} className="text-2xl md:text-4xl  text-slate-700 dark:text-blue-200 font-semibold">Powering</h4>
                <h4 style={monsterRat.style} className="text-2xl md:text-4xl  text-slate-700 dark:text-blue-200 font-semibold">Discovery</h4>
                <h4 style={monsterRat.style} className="text-2xl md:text-4xl  text-slate-700 dark:text-blue-200 font-semibold">For your world</h4>
                <button style={openSans.style} className="mt-16 text-sm capitalize bg-blue-500 dark:bg-blue-600 text-white dark:text-blue-100 px-4 py-2 rounded-md ring-2 ring-blue-400 shadow-md shadow-blue-300">start exploring now</button>
            </div>
            <Lottie animationData={searchUser} className='h-[32rem]' />
        </section>
    )

}

export default NoUser