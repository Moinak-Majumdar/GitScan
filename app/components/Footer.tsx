import { Roboto_Mono } from 'next/font/google';
import React from 'react'

const robotoMono = Roboto_Mono({ display: 'swap', weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

const Footer = () => {

    const d = new Date()
    return (
        <footer style={robotoMono.style} className='mt-8 w-full px-4  flex justify-center items-center text-xs text-slate-700 dark:text-slate-400'>
            <span className='mr-2 text-lg'>&copy;</span>
            <span>{`${d.getFullYear()} - `}</span>
            <span className='ml-2'>All Right Reserved</span>
        </footer>
    )
}

export default Footer