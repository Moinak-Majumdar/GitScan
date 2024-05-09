'use client'


import NoUser from "./components/NoUser";
import DisplayUser from "./components/DisplayUser";
import SearchUser from "./components/SearchUser";
import { GithubUser } from "./utils/models";
import { useState } from "react";

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
    'JavaScript': {count: 30, color: '#fcba03'},
    'TypeScrip': {count: 20, color: '#03a1fc'},
    'Dart': {count: 10, color: '#03fcfc'},
    'Python': {count: 20, color: '#03fcfc'},
    'Jupyter Notebook': {count: 20, color: '#fc9803'},
  },
  watcherCount: 19,
  website: 'https://moinak05.vercel.app'
}

export default function Home() {

  const [userData, setUserData] = useState<GithubUser| null>(null)

  return (
    <>
      <div className="absolute top-3 md:top-4 right-16 xl:right-36 2xl:right-44 z-40">
        
        <SearchUser setUser={setUserData}/>
      </div>
      <main className="lg:h-[100vh] overflow-hidden flex justify-center items-center" >
          {userData ? <DisplayUser userData={userData}/> : <NoUser />}
      </main>
    </>
  );
}
