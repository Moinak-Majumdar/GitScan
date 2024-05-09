"use client"

import { Inter, Open_Sans, Roboto_Mono, Montserrat } from "next/font/google";
import { NextFont } from 'next/dist/compiled/@next/font';
import { Context, useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { ThemeProvider } from "next-themes";

const inter = Inter({ display: 'swap', weight: ['300', "400", "500", "600", "700"], subsets: ['latin'] });
const openSans = Open_Sans({ display: "swap", weight: ["300", "400", "500", "600", "700"], subsets: ['latin'] });
const robotoMono = Roboto_Mono({ display: 'swap', weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });
const monsterRat = Montserrat({ display: 'swap', weight: ['300', '400', '500', '600', '700', '800'], subsets: ['latin'] });

type AppThemeType = { IsClient: boolean, inter: NextFont, openSans: NextFont, robotoMono: NextFont, monsterRat: NextFont };
let AppThemeContext: Context<AppThemeType>

const AppTheme = ({children}: {children: ReactNode}) => {

    const [IsClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    
    const value: AppThemeType = {
        IsClient,
        inter, openSans, robotoMono, monsterRat
    }

    AppThemeContext = createContext(value)

    return (
        <AppThemeContext.Provider value={value}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}

export function useAppTheme () {
    return useContext(AppThemeContext);
}

export default AppTheme