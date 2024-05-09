"use client"

import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "next-themes"
import { useAppTheme } from "../context/AppTheme";

function ModeSwitch1() {
    const { resolvedTheme, setTheme } = useTheme();
    const {IsClient} = useAppTheme()


    if (IsClient) {
        if (resolvedTheme === 'dark') {
            return (
                <div className='absolute top-0 right-2 mt-2 z-40 bg-slate-700/40 p-[9px] rounded-full'>
                    <DarkModeSwitch
                        checked={true}
                        onChange={() => setTheme('light')}
                        size={28}
                    />
                </div>
            )
        }

        if (resolvedTheme === 'light') {
            return (
                <div className='absolute top-0 right-2 mt-2 z-40 bg-slate-200/50 p-[9px] rounded-full'>
                    <DarkModeSwitch
                        checked={false}
                        onChange={() => setTheme('dark')}
                        size={28}
                    />
                </div>
            )
        }
    } else {
        return <></>
    }
}

function ModeSwitch2() {
    const { resolvedTheme, setTheme } = useTheme();

    if (resolvedTheme === 'dark') {
        return (
            <div onClick={() => setTheme('light')} className='bg-slate-700/70 shadow-md shadow-black p-2 rounded-lg flex justify-center items-center cursor-pointer'>
                <p className='capitalize mr-3 font-semibold'>{`${resolvedTheme} mode`}</p>
                <DarkModeSwitch
                    checked={true}
                    onChange={() => setTheme('light')}
                    size={35}
                />
            </div>
        )
    }

    if (resolvedTheme === 'light') {
        return (
            <div onClick={() => setTheme('dark')} className='bg-slate-200/80 shadow-md shadow-gray-700 p-2 rounded-lg flex justify-center items-center cursor-pointer'>
                <p className='capitalize mr-3 font-semibold'>{`${resolvedTheme} mode`}</p>
                <DarkModeSwitch
                    checked={false}
                    onChange={() => setTheme('dark')}
                    size={35}
                />
            </div>
        )
    }
}


export { ModeSwitch1, ModeSwitch2 }