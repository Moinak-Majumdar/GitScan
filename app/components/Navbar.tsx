import { Open_Sans } from "next/font/google";
import { ModeSwitch1 } from "./ModeSwitch"

const openSans = Open_Sans({ display: "swap", weight: ["300", "400", "500", "600", "700"], subsets: ['latin'] });


const Navbar = () => {
    return (
        <>
            <header className="absolute inset-0 h-fit py-3 min-w-full pr-16 pl-4 md:pl-10 lg:pl-16 xl:pl-36 2xl:pl-44 md:pr-32 2xl:pr-44 flex flex-wrap items-center justify-start z-40">
                <h1 style={openSans.style} className="text-2xl 2xl:text-3xl font-extrabold text-blue-600">GitScan</h1>
            </header>
            <ModeSwitch1 />
        </>
    )
}

export default Navbar