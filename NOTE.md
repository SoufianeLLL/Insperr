
const rectifyFormat = (s) => {
	let b = s.split(/\D/)
	return b[0] + '-' + b[1] + '-' + b[2] + 'T' +
			b[3] + ':' + b[4] + ':' + b[5] + '.' +
			b[6].substr(0,3) + '+00:00';
}

const now = new Date()
let tweetedQuotes = 0
for (let i = quotes.length; i--;) {
    const then = new Date(rectifyFormat(quotes[i]?.created_at))
    const dateY = +then + 1000*60*60*24*365 < +now
    if (!dateY) {
        visitsYearly += quotes[i]?.views
    }
    const dateM = Math.abs(then.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
    if (dateM < 30) {
        visitsMonthly += quotes[i]?.views
    }
}
