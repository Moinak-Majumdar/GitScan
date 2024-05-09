import getLanguageColor from "./colors";
import { GithubUser } from "./models";


class GithubServer {
    private uname: string

    constructor(uname: string) {
        this.uname = uname;
    }

    async get(): Promise<Response> {

        const lang: { [key: string]: { count: number, color: string } } = {}
        let userData: GithubUser = { name: '', accCreatedAt: '', avatar: '', bio: '', email: '', followers: 0, following: 0, forkCount: 0, githubUrl: '', handel: this.uname, issueCount: 0, location: '', repos: 0, stars: 0, usedLanguages: null, watcherCount: 0, website: '' };

        const headers = new Headers()
        headers.append('Content-type', 'application/json')

        try {
            const res = await fetch(`https://api.github.com/users/${this.uname}`);

            if (!res.ok) {
                throw new Error('Error')
            }

            const json = await res.json()

            const createdAt = formatDate(json['created_at'])

            userData.name = json['name'] ?? this.uname;
            userData.githubUrl = json['html_url'];
            userData.accCreatedAt = createdAt;
            userData.avatar = json["avatar_url"];
            userData.bio = json['bio'] ?? 'This profile has no bio.';
            userData.followers = json['followers'];
            userData.following = json['following'];
            userData.location = json['location'] ?? 'Not available';
            userData.repos = json['public_repos'];
            userData.website = json['blog'] === '' ? null : json['blog'];
            userData.email = json['email']

        } catch (error) {
            // console.log(error)
            return new Response(
                JSON.stringify({ 'error': 'No records found!' }),
                { status: 400, headers }
            )
        }

        if (userData.repos > 0) {
            const res = await fetch(`https://api.github.com/users/${this.uname}/repos`);
            const json = await res.json();

            json.forEach((repo: any) => {
                userData.stars += repo.stargazers_count
                userData.watcherCount += repo.watchers_count
                if (repo.language != null) {
                    if (lang[repo.language] === undefined) {
                        lang[repo.language] = { count: 1, color: getLanguageColor(repo.language) }
                    } else {
                        lang[repo.language].count += 1
                    }
                }
                userData.issueCount += repo.open_issues_count
                userData.forkCount += repo.forks_count
            });

            userData.usedLanguages = lang

        }

        return new Response(JSON.stringify(userData), { status: 200, headers })

    }
}

function formatDate(date: string): string {
    const d = new Date(date)
    const mm = d.toLocaleDateString('eng-us', { month: 'short' })
    const dd = d.getDate()
    let sup = ''
    if (dd == 1) {
        sup = 'st'
    } else if (dd == 2) {
        sup = 'nd'
    } else if (dd == 3) {
        sup = 'rd'
    } else {
        sup = 'th'
    }
    const yy = d.getFullYear()

    return `Joined ${dd}${sup} ${mm} ${yy}`
}




export { GithubServer }