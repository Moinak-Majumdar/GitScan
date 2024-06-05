import Link from 'next/link'
import { GoLaw, GoEye, GoIssueOpened } from "react-icons/go";
import { FaRegStar, FaExternalLinkAlt } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { GithubRepo } from '@/app/utils/models';
import { Inter, Montserrat, Open_Sans, Roboto_Mono } from 'next/font/google';
import { RiGitRepositoryFill } from 'react-icons/ri';
import { repoDateFormat } from '@/app/utils/utils';

const inter = Inter({ display: 'swap', weight: ['300', "400", "500", "600", "700"], subsets: ['latin'] });
const openSans = Open_Sans({ display: "swap", weight: ["300", "400", "500", "600", "700"], subsets: ['latin'] });
const robotoMono = Roboto_Mono({ display: 'swap', weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });
const monsterRat = Montserrat({ display: 'swap', weight: ['300', '400', '500', '600', '700', '800'], subsets: ['latin'] });

const Repository = (props: { repos: GithubRepo[] }) => {

  const repos = props.repos

  return (
    <ul className='mt-8 mx-auto w-fit columns-1 lg:columns-2 gap-4'>
      {repos.map((repo, i) => {
        return (
          <li key={`${repo.name}_${i}`} className='w-full md:w-[30rem] xl:w-[35rem] bg-slate-300/20 hover:bg-blue-300/20 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 p-4 rounded-md  ring-2 ring-blue-200 hover:ring-blue-300/70 dark:ring-slate-700 dark:hover:ring-slate-500 break-inside-avoid mb-4 flex flex-col'>
            <div className='inline-flex flex-wrap items-center gap-x-4'>
              <div className='flex items-center gap-x-2'>
                <RiGitRepositoryFill className='text-blue-600 dark:text-blue-200' />
                <Link href={repo.url} style={robotoMono.style} className='text-lg text-blue-500 dark:text-blue-400 font-semibold hover:underline' target='_BLANK'>{repo.name}</Link>
              </div>
              {repo.language && <div className='flex items-center gap-1'>
                <span className='w-2 h-2 rounded-full' style={{ backgroundColor: repo.language.color }}></span>
                <span style={monsterRat.style} className='font-bold text-slate-500 text-xs'>{repo.language.name}</span>
              </div>}
            </div>
            <article style={inter.style} className='mt-2 text-sm leading-4 text-slate-700 dark:text-slate-400'>{repo.description ?? 'This repository has no description.'}</article>
            <div className='flex flex-wrap items-center justify-start gap-x-4 font-medium' style={inter.style}>
              {repo.stars > 0 && <div className='mt-4 flex items-center gap-1 text-xs'>
                <FaRegStar className='text-sm' />
                <span>{`${repo.stars} ${repo.stars == 1 ? 'star' : 'stars'}`}</span>
              </div>}
              {repo.forks > 0 && <div className='mt-4 flex items-center gap-1 text-xs'>
                <FaCodeFork className='text-md' />
                <span>{`${repo.forks} ${repo.forks == 1 ? 'fork' : 'forks'}`}</span>
              </div>}
              {repo.watchers > 0 && <div className='mt-4 flex items-center gap-1 text-xs'>
                <GoEye className='text-md' />
                <span>{`${repo.watchers} watching`}</span>
              </div>}
              {repo.issue > 0 && <div className='mt-4 flex items-center gap-1 text-xs'>
                <GoIssueOpened className='text-md' />
                <span>{`${repo.issue} issues`}</span>
              </div>}
            </div>
            <div className='mt-2 flex flex-wrap gap-4 justify-start items-center'>
              <p className='text-xs text-slate-700 font-semibold dark:text-blue-200/80' style={openSans.style}>{`Updated on ${repoDateFormat(repo.updated_at)}`}</p>
              {repo.license && <div className='flex items-center gap-1 border border-blue-300 rounded-full px-2 py-1 dark:text-blue-300 text-slate-700' style={inter.style}>
                <GoLaw />
                <span className='text-xs'>{repo.license}</span>
              </div>}
            </div>
            {repo.topics && <div className='mt-4 w-full inline-flex flex-wrap items-center my-1 gap-2'>
              {repo.topics.map((topic, i) => {
                return (
                  <div key={`topic_${i}`} className='bg-blue-500/20 hover:bg-blue-500 text-blue-500 hover:text-blue-100 px-2 py-1 rounded-full text-xs w-fit font-bold'>{topic}</div>
                )
              })}
            </div>}
            {repo.homepage && <Link href={repo.homepage} target='_BLANK' className='mt-4 text-sm bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-md px-3 py-2 w-fit text-white font-bold flex items-center gap-2'>
              <span style={openSans.style} className='text-xs'>Homepage</span>
              <FaExternalLinkAlt />
            </Link>}
          </li>
        )
      })}
    </ul>
  )
}

export default Repository