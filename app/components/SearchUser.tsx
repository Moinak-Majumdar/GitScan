'use client'

import { useRef, useEffect, FormEvent, Dispatch, SetStateAction } from 'react'
import { IoMdSearch } from "react-icons/io";
import { useAppTheme } from '../context/AppTheme';
import { GithubServer } from '../utils/GitHub';
import { GithubUser } from '../utils/models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface props { setUser: Dispatch<SetStateAction<GithubUser | null>> }

const SearchUser = (props: props) => {

    const { openSans, monsterRat, robotoMono } = useAppTheme();
    const dialogRef = useRef<HTMLDialogElement>(null)
    const uNameRef = useRef<HTMLInputElement>(null)

    const handelKeyPress = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key == 'k') {
            e.preventDefault();
            dialogRef.current?.showModal();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handelKeyPress);

        return () => {
            document.removeEventListener('keydown', handelKeyPress);
        }
    }, [])

    async function handelSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const uname = uNameRef.current?.value;
        dialogRef.current?.close()

        if (uname != null) {
            const server = new GithubServer(uname);
            const res = await server.get()

            if (res.ok) {
                const userData: GithubUser = await res.json()
                toast('User found 👍')
                props.setUser(userData);
            } else {
                toast.error(`No user found with requested user name ${uname}`, {theme: "colored"})
                props.setUser(null);
            }

        }
    }

    return (
        <>
            <button onClick={() => dialogRef.current?.showModal()} className='ring-1 ring-slate-900/10 dark:ring-slate-700/50 shadow-sm hover:ring-slate-300 dark:hover:ring-slate-700/80 px-3 md:px-4 py-3 md:py-1 rounded-full md:rounded-lg md:h-8 md:flex items-center dark:bg-slate-700/30 bg-slate-200/50 cursor-pointer outline-none'>
                <IoMdSearch className='text-slate-800 dark:text-slate-300 text-xl md:text-lg' />
                <span className='hidden md:inline text-slate-600 dark:text-slate-400 text-xs pl-3 ml-auto font-normal leading-7 '>Quick Search...</span>
                <span className='hidden md:inline text-slate-600 dark:text-slate-300 ml-auto font-semibold text-xs pl-3'>Ctrl K</span>
                <span className='sr-only'>Quick Search</span>
            </button>
            <dialog ref={dialogRef} className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-1/2 lg:w-1/3 bg-white dark:bg-slate-800 rounded-md shadow-2xl dark:shadow-black'>
                <div className='flex justify-between text-slate-500  p-4'>
                    <h1 className='text-xl lg:text-2xl font-bold' style={openSans.style}>Github Profile Finder</h1>
                    <span onClick={() => dialogRef.current?.close()} style={robotoMono.style} className='ring-1 rounded-md text-xs h-fit p-1 ring-slate-900/10 dark:ring-slate-700/50 shadow-sm ml-3 cursor-pointer'>
                        Esc
                    </span>
                </div>
                <hr className='h-1' />
                <form onSubmit={handelSubmit} className='w-full flex p-4'>
                    <input autoFocus={true} ref={uNameRef} required style={monsterRat.style} name="github username" placeholder='Search Github username...' className="w-full bg-slate-500/10 dark:bg-white/10 rounded border border-slate-300 dark:border-slate-500 focus:border-slate-800 focus:ring-1 focus:ring-slate-200 dark:focus:ring-slate-500 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "></input>
                    <button type='submit' style={robotoMono.style} className='ml-2 px-2 py-1 bg-blue-600 rounded-md text-slate-200 hover:bg-blue-700 transition duration-500 ease-in-out outline-none'>search</button>
                </form>
            </dialog>
            <ToastContainer autoClose={3000} pauseOnHover={true} newestOnTop={true}  />
        </>
    )

}

export default SearchUser