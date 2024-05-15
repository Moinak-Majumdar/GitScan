'use client'

import { FormEvent, RefObject, useRef, useState } from 'react'
import { GithubServer } from '../utils/GitHub';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useAppTheme } from '../context/AppTheme';

interface props { modalRef: RefObject<HTMLDialogElement> }
const CreateResume = (props: props) => {

    const { inter, monsterRat, robotoMono, openSans } = useAppTheme()
    const uNameRef = useRef<HTMLInputElement>(null)
    const [showSuccess, toggleShowSuccess] = useState<boolean>(false)
    const [clipboard, setClipboard] = useState<string>('')


    async function handelSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        toggleShowSuccess(false)
        const uName = uNameRef.current?.value;

        if (uName != null) {
            const server = new GithubServer(uName);
            const res = await server.get()

            if (res.ok) {
                const origin = window.origin
                toggleShowSuccess(true)
                setClipboard(`${origin}/resume/${uNameRef.current?.value}`)
            } else {
                setClipboard('')
                toast.error(`No user found with requested user name ${uName}`, { theme: "colored" })
            }
        }
    }

    async function CopyToClipboard() {
        navigator.clipboard.writeText(clipboard).then(() => {
            toast.success('📃 URL copied at clipboard.', { theme: 'colored' })
        }).catch((err) => {
            throw Error(err)
        })
    }


    return (
        <>
            <dialog ref={props.modalRef} className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-1/2 lg:w-1/3 bg-white dark:bg-slate-800 rounded-md shadow-2xl dark:shadow-black'>
                <div className='flex justify-between text-slate-500 dark:text-blue-300  p-4'>
                    <h1 className='text-xl lg:text-2xl font-bold' style={openSans.style}>Craft Resume 🔨</h1>
                    <span onClick={() => props.modalRef.current?.close()} style={robotoMono.style} className='ring-1 rounded-md text-xs h-fit p-1 ring-slate-900/10 dark:ring-slate-700/50 shadow-sm ml-3 cursor-pointer'>
                        Esc
                    </span>
                </div>
                <hr className='bg-slate-400 dark:bg-slate-800 h-[2px]' />
                <form onSubmit={handelSubmit} className='w-full flex p-4'>
                    <input ref={uNameRef} required style={monsterRat.style} name="github username" placeholder='Your Github username...' className="w-full bg-slate-500/10 dark:bg-white/10 rounded border border-slate-300 dark:border-slate-500 focus:border-slate-800 focus:ring-1 focus:ring-slate-200 dark:focus:ring-slate-500 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "></input>
                    <button type='submit' style={robotoMono.style} className='ml-2 px-2 py-1 bg-slate-600 rounded-md text-slate-200 hover:bg-slate-500 transition duration-500 ease-in-out outline-none'>craft</button>
                </form>
                <div style={{ display: showSuccess ? 'block' : 'none' }} className='w-full p-4'>
                    <h3 style={inter.style} className='text-lg lg:text-xl text-slate-600 dark:text-slate-400 capitalize font-semibold'>your resume is created 🎉 </h3>
                    <p style={robotoMono.style} className='mt-2 mb-4 text-slate-700 dark:text-slate-300 text-sm'>
                        Your resume, a masterpiece, ready to display, <br />
                        In the world of tech, it&apos;s time to sway. <br />
                        With GitHub insights in your array, <br />
                        Share now, and let success play! 💼🌟
                    </p>
                    {uNameRef.current && <Link href={`/resume/${uNameRef.current?.value}`} className='p-1 bg-blue-200 rounded-md text-blue-500 text-xs font-bold'>{clipboard}</Link>}
                    <div className='w-full flex justify-end mt-4 gap-2 text-sm font-semibold'>
                        <button onClick={CopyToClipboard} className='px-4 py-2 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-600  rounded-md' style={monsterRat.style}>📋 copy url</button>
                        <Link href={`/resume/${uNameRef.current?.value}`} className='px-4 py-2 text-blue-600 dark:text-white bg-blue-200 dark:bg-blue-500 text-sm rounded-md' style={monsterRat.style}>🔗 open url</Link>
                    </div>
                </div>
            </dialog>
            <ToastContainer autoClose={3000} pauseOnHover={true} newestOnTop={true} />
        </>
    )
}

export default CreateResume