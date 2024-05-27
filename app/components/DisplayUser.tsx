import React from 'react'
import { GithubUser } from '../utils/models'
import Image from 'next/image'
import { Inter, Roboto_Mono } from 'next/font/google';
import Link from 'next/link';
import LangChart from './LangChart';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdLocationPin, MdOutlineEmail } from 'react-icons/md';


const inter = Inter({ display: 'swap', weight: ['300', "400", "500", "600", "700"], subsets: ['latin'] });
const robotoMono = Roboto_Mono({ display: 'swap', weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

const DisplayUserLeftPart = ({ userData }: { userData: GithubUser }) => {
  return (
    <>
      <div className="inline-flex justify-center items-center p-[2px] animate-shift rounded-full" style={{ background: 'linear-gradient(45deg, #f06, #f79, #06f, #79f, #0ff, #9f7)', backgroundSize: '300%, 300%' }}>
        <Image src={userData.avatar} alt="Github user avatar" width={250} height={250} className="block w-full h-auto rounded-full border-[6px] border-blue-200 dark:border-slate-800" />
      </div>
      <p style={robotoMono.style} className="text-xs mt-12 text-slate-700 dark:text-slate-300">
        {userData.accCreatedAt}
      </p>
      <div className="text-xs flex items-center gap-2 mt-8 justify-center w-full text-slate-700 dark:text-slate-300">
        <MdLocationPin className="text-lg text-slate-500" />
        <span>{userData.location}</span>
      </div>
      <div className="text-xs flex items-center gap-2 mt-4 justify-center  w-full text-slate-700 dark:text-slate-300">
        <MdOutlineEmail className="text-xl text-red-600" />
        {userData.email ? <Link href={`mailto:${userData.email}`}>{userData.email}</Link> : <span>Not found!</span>}
      </div>
      <div className="text-xs flex items-center gap-2 mt-4 justify-center w-full text-slate-700 dark:text-slate-300">
        <FaExternalLinkAlt className="text-lg text-blue-900 dark:text-blue-800" />
        {userData.website ? <Link href={userData.website} target="_BLANK" className="text-blue-500 hover:text-blue-600">{userData.website}</Link> : <span>Not found!</span>}
      </div>
    </>
  )
}

const DisplayUserRightPart = ({ userData }: { userData: GithubUser }) => {
  return (
    <div className='w-full lg:w-fit flex items-center flex-col lg:block mt-12 lg:mt-0'>
      <h2 className="text-2xl lg:text-4xl font-bold text-slate-700 dark:text-blue-300 mb-1" style={robotoMono.style}>{userData.name}</h2>
      <Link href={userData.githubUrl} style={inter.style} className=" text-blue-600 hover:text-blue-500 text-sm md:text-lg">{`@${userData.handel}`}</Link>
      <article className="max-w-[30rem] mt-2 text-xs md:text-sm">
        <p className="text-gray-700 dark:text-gray-300">{userData.bio}</p>
      </article>
      <div className="flex flex-col-reverse lg:flex-row md:justify-between w-full items-center">
        <div className="my-12 lg:my-0">
          <div className="relative overflow-x-auto rounded-md mt-8">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-blue-50 dark:bg-gray-700 border-b dark:border-gray-600" style={inter.style}>
                <tr>
                  <th scope="col" className="px-6 py-3">Repos</th>
                  <th scope="col" className="px-6 py-3">Followers</th>
                  <th scope="col" className="px-6 py-3">Following</th>
                </tr>
              </thead>
              <tbody style={robotoMono.style}>
                <tr className="bg-white dark:bg-gray-800  text-center">
                  <td className="px-6 py-2">{userData.repos}</td>
                  <td className="px-6 py-2">{userData.followers}</td>
                  <td className="px-6 py-2">{userData.following}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="relative overflow-x-auto mt-8 rounded-md">
            <p className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-blue-50 dark:bg-gray-700 px-6 py-3 text-center font-bold" style={inter.style}>Repository Stats</p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Stars Earned</th>
                  <td className="px-6 py-4">{userData.stars}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Get Forked</th>
                  <td className="px-6 py-4">{userData.forkCount}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Watcher</th>
                  <td className="px-6 py-4">{userData.watcherCount}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Open  Issue</th>
                  <td className="px-6 py-4">{userData.issueCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-72 lg:h-80 xl:h-[22rem] w-full flex justify-center items-center mt-12 lg:mt-0">
          {userData.usedLanguages ? <LangChart languages={userData.usedLanguages} /> : <></>}
        </div>
      </div>
    </div>
  )
}

export { DisplayUserLeftPart, DisplayUserRightPart }