'use client'

import { useAppTheme } from '@/app/context/AppTheme';
import { GithubRepo } from '@/app/utils/models'
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Repository from './Repository';


enum Filters { Alphabetically = 'alpha', LatestUpdated = "latest", Oldest = 'oldest', Stars = 'stars' }
type Pages = { index: number, total: number }
type RepoPages = { [keys: number]: GithubRepo[] }

const Repos = (props: { Data: GithubRepo[] }) => {

    const serverData = props.Data
    const { openSans, robotoMono, } = useAppTheme()
    const [repos, setRepos] = useState<RepoPages>();
    const [pages, setPages] = useState<Pages>({ index: 1, total: 1 })
    const sectionRef = useRef<HTMLSelectElement>(null)

    useEffect(() => {
        const data = applyFilter(Filters.LatestUpdated, serverData)
        setPages(data.pages)
        setRepos(data.repos)
    }, [])

    function updateFilter(filter: string) {
        const data = applyFilter(filter, serverData)
        setPages(data.pages)
        setRepos(data.repos)
    }

    function changePage(option: string) {
        const element = sectionRef.current
        element?.scrollIntoView()

        if(option == "next" && pages.index < pages.total) {
            const index = pages.index + 1;
            const total = pages.total
            setPages({index, total})
        }
        if(option == 'prev' && pages.index > 1) {
            const index = pages.index - 1;
            const total = pages.total;
            setPages({index, total})
        } 
    }

    return (
        <section ref={sectionRef} className='mt-20 w-full px-4 md:px-0'>
            <div className='w-full flex justify-between items-center'>
                <h2 style={openSans.style} className=' bg-gradient-to-br from-blue-600 via-sky-400 to-blue-600 bg-clip-text text-transparent leading-7 gap-2 font-bold text-xl'>
                    Repositories Showcase
                </h2>
                <select style={robotoMono.style} defaultValue={Filters.LatestUpdated} onChange={e => updateFilter(e.target.value)} className="text-slate-800 dark:text-slate-300 bg-blue-300/40 font-medium rounded-lg text-xs md:text-sm  px-3 py-2 text-center inline-flex items-center dark:bg-slate-700 outline-none">
                    <option className='text-left' value={Filters.Alphabetically}>Alphabetically</option>
                    <option className='text-left' value={Filters.LatestUpdated}>Latest updated</option>
                    <option className='text-left' value={Filters.Oldest}>Oldest</option>
                    <option className='text-left' value={Filters.Stars}>Stars</option>
                </select>
            </div>
            {repos && <Repository repos={repos[pages.index]} />}
           {/* Pagination */}
            <div className="w-full justify-center items-center flex mt-8 gap-4">
                <button onClick={() => changePage('prev')} disabled={pages.index == 1} className="flex items-center justify-center px-4 h-10  text-base font-medium text-gray-700 bg-gray-300/50 border border-gray-300 rounded-lg hover:bg-gray-300/80 hover:text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-slate-200 disabled:bg-slate-200/20 dark:disabled:bg-slate-800/20 dark:disabled:text-slate-600/30 disabled:text-slate-700/20 disabled:cursor-not-allowed cursor-pointer">
                    <IoIosArrowBack />
                    <span style={robotoMono.style}>Previous</span>
                </button>
                <p style={robotoMono.style}>{pages.index}</p>
                <button onClick={() => changePage('next')} disabled={pages.index == pages.total} className="flex items-center justify-center px-4 h-10  text-base font-medium text-gray-700 bg-gray-300/50 border border-gray-300 rounded-lg hover:bg-gray-300/80 hover:text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-slate-200 disabled:text-slate-700/20 dark:disabled:bg-slate-800/20 dark:disabled:text-slate-600/30 disabled:cursor-not-allowed cursor-pointer">
                    <span style={robotoMono.style}>Next</span>
                    <IoIosArrowForward />
                </button>
            </div>
        </section>
    )
}

function applyFilter(filter: string, data: GithubRepo[]): { pages: Pages, repos: RepoPages } {
    const temp = data
    switch (filter) {
        case Filters.Oldest:
            temp.sort((a, b) => {
                return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
            })
            break;
        case Filters.LatestUpdated:
            temp.sort((a, b) => {
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            })
            break;
        case Filters.Stars:
            temp.sort((a, b) => {
                return b.stars - a.stars
            })
            break;
        case Filters.Alphabetically : 
        temp.sort((a, b) => a.name.localeCompare(b.name))
        break;
    }

    /*
        creating pages : 10 repos per page
        {
            1: [0 - 9] repos
            2: [10 - 19] repos
            ....
        }
    */

    if (temp.length > 10) {
        const total = Math.ceil(temp.length / 10)
        const repos: RepoPages = {}
        let startIndex = 0;
        for (let i = 1; i <= total; i++) {
            repos[i] = temp.slice(startIndex, startIndex + 10)
            startIndex += 9
        }
        return {
            pages: { index: 1, total },
            repos
        }
    }

    return {
        pages: { index: 1, total: 1 },
        repos: { 1: temp }
    }
}

export default Repos