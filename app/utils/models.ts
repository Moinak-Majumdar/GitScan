import { ChartData } from "chart.js"

export type LanguageDataset = ChartData<'doughnut', number[], string>

export type GithubUser = {
    name: string, 
    handel: string,  // github user handel
    githubUrl: string, 
    accCreatedAt: string, 
    location: string, 
    avatar: string, 
    bio: string, 
    followers: number, 
    following: number, 
    repos: number, 
    website: string | null, // user blog website
    email: string | null
    stars: number, 
    usedLanguages: { [key: string]: { count: number, color: string } } | null,  // used language across all repos with respective count and color code for display chart. 
    watcherCount: number,  // total watchers across all repos
    forkCount: number,  // total forks across all repos
    issueCount: number,  // total issue opened in all repos
}

