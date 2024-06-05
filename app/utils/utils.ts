function validateURL(url: string | null) {
    if(url == null || url == '') return null;

    if (URL.canParse(url)) {
        return url
    } else {
        //  missing protocol
        if (!url.startsWith("https://")) {
            return "https://" + url
        }
        return null
    }
}

function userDateFormat(date: string): string {
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

function repoDateFormat(date: string): string {
    const d = new Date(date)
    const mm = d.toLocaleDateString('eng-us', { month: 'short' })
    const dd = d.getDate()
    const yy = d.getFullYear()

    return `${mm} ${dd}, ${yy}`
}

export {validateURL, repoDateFormat, userDateFormat}