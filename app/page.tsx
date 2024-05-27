'use client'


import NoUser from "./components/NoUser";
import { DisplayUserLeftPart, DisplayUserRightPart } from "./components/DisplayUser";
import SearchUser from "./components/SearchUser";
import { GithubUser } from "./utils/models";
import { useState } from "react";



export default function Home() {

  const [userData, setUserData] = useState<GithubUser | null>(null)

  if (userData) {
    return (
      <main className="lg:h-[100vh] overflow-hidden flex justify-center items-center">
        <section className='w-full flex justify-center items-center mt-24 lg:mt-0 p-4 md:p-10 lg:p-16 xl:p-36 2xl:p-44'>
          <div className='w-full flex flex-col lg:flex-row  lg:justify-evenly'>
            <div className="flex items-center flex-col">
              <SearchUser setUser={setUserData} />
              <DisplayUserLeftPart userData={userData} />
            </div>
            <DisplayUserRightPart userData={userData} />
          </div>
        </section>
      </main>
    )
  } else {
    return (
      <>
        <main className="flex justify-center items-center min-h-screen" >
          <NoUser />
        </main>
        {/* button at navbar */}
        <div className="hidden lg:block absolute top-4 right-56 xl:right-72 2xl:right-[22rem] z-40">
          <SearchUser setUser={setUserData} />
        </div>
      </>
    );
  }
}


const dummyUser: GithubUser = {
  name: 'Moinak Majumdar',
  accCreatedAt: '12th JAN 1906',
  avatar: 'https://avatars.githubusercontent.com/u/99950805?v=4',
  bio: 'Hi, I am Moinak Majumdar, A passionate full stack developer from India. Always keen to learn new web tech 👊 \r\nMERN | Next.js | Flutter',
  email: null,
  followers: 12,
  following: 11,
  forkCount: 8,
  githubUrl: "https://github.com/Moinak-Majumdar",
  handel: 'Moinak-Majumdar',
  issueCount: 1, location: 'West Bengal, India', repos: 29, stars: 19,
  usedLanguages: {
    'JavaScript': { count: 30, color: '#fcba03' },
    'TypeScrip': { count: 20, color: '#03a1fc' },
    'Dart': { count: 10, color: '#03fcfc' },
    'Python': { count: 20, color: '#03fcfc' },
    'Jupyter Notebook': { count: 20, color: '#fc9803' },
  },
  watcherCount: 19,
  website: 'https://moinak05.vercel.app'
}