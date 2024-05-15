import { GithubServer } from "@/app/utils/GitHub"
import { GithubUser } from "@/app/utils/models";
import { Inter, Roboto_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineEmail, MdLocationPin } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import LangChart from "../../components/LangChart";
import { Metadata, ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface";

const inter = Inter({ display: 'swap', weight: ['300', "400", "500", "600", "700"], subsets: ['latin'] });
const robotoMono = Roboto_Mono({ display: 'swap', weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

async function fetchDetails(slug: string) {
    const server = new GithubServer(slug)

    const res = await server.get();

    if (!res.ok) {
        throw new Error(`No records found for requested Github username: ${slug}`)
    }

    return await res.json();
}

export default async function User({ params }: { params: { slug: string } }) {

    const userData: GithubUser = await fetchDetails(params.slug);

    return (
        <main className="h-[100vh] flex justify-center items-center px-0 ">
            <section className="w-full md:w-fit flex flex-col md:flex-row bg-sky-100 dark:bg-black/20 rounded-xl">
                <div className="flex items-center flex-col bg-blue-200/80 dark:bg-slate-800  p-4 md:p-8 xl:p-12 rounded-xl">
                    <Image src={userData.avatar} alt="Github user avatar" width={250} height={250} className="rounded-full border-2 border-blue-700 p-1" />
                    <Link href={userData.githubUrl} style={inter.style} className="mt-4 text-blue-600 hover:text-blue-500 text-sm md:text-lg">{`@${userData.handel}`}</Link>
                    <article className="max-w-72 mt-4 text-xs md:text-sm">
                        <p className="text-gray-700 dark:text-gray-300">{userData.bio}</p>
                    </article>
                    <div className="text-xs flex items-center gap-2 mt-4 justify-center lg:justify-start w-full text-slate-700 dark:text-slate-300">
                        <MdLocationPin className="text-lg text-slate-500" />
                        <span>{userData.location}</span>
                    </div>
                    <div className="text-xs flex items-center gap-2 mt-4 justify-center lg:justify-start w-full text-slate-700 dark:text-slate-300">
                        <MdOutlineEmail className="text-xl text-red-600" />
                        {userData.email ? <Link href={`mailto:${userData.email}`}>{userData.email}</Link> : <span>Not found!</span>}
                    </div>
                    <div className="text-xs flex items-center gap-2 mt-2 justify-center lg:justify-start w-full text-slate-700 dark:text-slate-300">
                        <FaExternalLinkAlt className="text-lg text-blue-900 dark:text-blue-800" />
                        {userData.website ? <Link href={userData.website} target="_BLANK" className="text-blue-500 hover:text-blue-600">{userData.website}</Link> : <span>Not found!</span>}
                    </div>

                </div>
                <div className="w-full md:w-fit flex flex-col p-4 md:p-8 xl:p-12">
                    <div className="mt-8 lg:mt-0 text-center lg:text-start">
                        <h2 className="text-4xl font-bold text-slate-700 dark:text-blue-300" style={robotoMono.style}>{userData.name}</h2>
                        <h4 className="mt-4 text-xs dark:text-slate-300 text-slate-600">{userData.accCreatedAt}</h4>
                    </div>
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
            </section>
        </main >
    )
}

type metaDataProps = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params, searchParams }: metaDataProps, parent: ResolvingMetadata): Promise<Metadata> {

    const Data: GithubUser =  await fetchDetails(params.slug);

    return {
        title: `Resume | ${Data.handel}`,
        description: Data.bio,
        authors: [{ name: 'Moinak Majumdar', url: 'https://www.linkedin.com/in/moinak-majumdar' }],
        creator: "Moinak Majumdar",
        publisher: "Vercel",
        metadataBase: new URL('https://gitscan.vercel.app/'),
        openGraph: {
            type: 'website',
            title: `Resume | ${Data.handel}`,
            description: Data.bio,
            images: Data.avatar,
        }
    }
}
