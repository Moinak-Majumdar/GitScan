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
                <div className='absolute top-0 right-2 mt-2 z-40 bg-blue-400/10 p-[9px] rounded-full'>
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


export { ModeSwitch1 }