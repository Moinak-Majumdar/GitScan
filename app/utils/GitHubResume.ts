import getLanguageColor from "./colors";
import { GithubUser, GithubRepo } from "./models";


class GithubResumeServer {
    private uname: string

    constructor(uname: string) {
        this.uname = uname;
    }

    async get(): Promise<Response> {
        let userData: GithubUser = { name: '', accCreatedAt: '', avatar: '', bio: '', email: '', followers: 0, following: 0, forkCount: 0, githubUrl: '', handel: this.uname, issueCount: 0, location: '', repos: 0, stars: 0, usedLanguages: null, watcherCount: 0, website: '' };
        const repoData: GithubRepo[] = [];

        const headers = new Headers()
        const token = process.env.GITHUB_TOKEN

        try {
            headers.append('Content-type', 'application/json')
            token && headers.append('Authorization', `token ${token}`)

            // -------------
            // User stats
            // -------------

            const res = await fetch(`https://api.github.com/users/${this.uname}`, { headers });

            if (!res.ok) {
                throw new Error('Error')
            }

            const json = await res.json()

            userData.name = json['name'] ?? this.uname;
            userData.githubUrl = json['html_url'];
            userData.accCreatedAt = formatDate(json['created_at']);
            userData.avatar = json["avatar_url"];
            userData.bio = json['bio'] ?? 'This profile has no bio.';
            userData.followers = json['followers'];
            userData.following = json['following'];
            userData.location = json['location'] ?? 'Not available';
            userData.repos = json['public_repos'];
            userData.website = json['blog'] === '' ? null : json['blog'];
            userData.email = json['email']

            // ------------------
            // Repository stats
            // ------------------


            if (userData.repos > 0) {
                const lang: { [key: string]: { count: number, color: string } } = {}
                const TOTAL_PAGES = Math.ceil(userData.repos / 100);

                for (let PAGE_INDEX = 1; PAGE_INDEX <= TOTAL_PAGES; PAGE_INDEX++) {

                    const res = await fetch(`https://api.github.com/users/${this.uname}/repos?per_page=100&page=${PAGE_INDEX}`, { headers });

                    if (res.ok) {
                        const json = await res.json();

                        // iterating each repos for total stats.
                        json.forEach((repo: any) => {
                            userData.issueCount += repo.open_issues_count
                            userData.forkCount += repo.forks_count
                            userData.stars += repo.stargazers_count
                            userData.watcherCount += repo.watchers_count

                            if (repo.language != null) {
                                if (lang[repo.language] === undefined) {
                                    lang[repo.language] = { count: 1, color: getLanguageColor(repo.language) }
                                } else {
                                    lang[repo.language].count += 1
                                }
                            }

                            userData.usedLanguages = lang

                            repoData.push({
                                name: repo['name'],
                                created_at: repo["created_at"],
                                description: repo["description"],
                                homepage: repo['homepage'],
                                issue: repo["open_issues_count"],
                                forks: repo['forks_count'],
                                language: repo.language != null ? {name: repo.language, color: getLanguageColor(repo.language)}: null,
                                license: repo["license"] != null ? repo["license"].name : null,
                                stars: repo["stargazers_count"],
                                topics: repo['topics'].length > 0 ? repo['topics'] : null,
                                updated_at: repo["updated_at"],
                                url: repo['html_url'],
                                watchers: repo["watchers_count"], 
                            })
                        })
                    }
                }
            }

        } catch (error) {
            // console.log(error)
            return new Response(JSON.stringify({ 'error': 'No records found!' }), { status: 400, headers: { 'Content-type': 'application/json' }})
        }

        return new Response(JSON.stringify({userData, repoData}), { status: 200, headers: { 'Content-type': 'application/json' }})

    }
}

function formatDate(date: string): string {
    const d = new Date(date)
    const mm = d.toLocaleDateString('eng-us', { month: 'short' })
    const dd = d.getDate()
    const yy = d.getFullYear()

    return `${mm} ${dd}, ${yy}`
}




export { GithubResumeServer, formatDate }