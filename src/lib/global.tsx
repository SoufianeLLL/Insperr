import Link from "next/link"
// import requestIp from 'request-ip'


const fetcher = (url) => fetch(url).then((res) => res.json())

const searchForAuthors = async (e, authors) => {
	let fetchedAuthors = []
	if (e?.target?.value && e?.target?.value?.length > 4) {
		await authors.map((post) => {
			if (post?.name?.toLowerCase()?.includes(e?.target?.value?.toLowerCase())) {
				fetchedAuthors.push(post)
			}
		})
		if (fetchedAuthors?.length === 0) {
			return { 
				error: <div>The name is not found on our Database, please <Link href="/authors/add" className="text-blue-500">click here</Link> to add this name (make sure it's a correct name or you'll get banned from this feature).</div>
			}
		}
		else {
			return fetchedAuthors
		}
	}
	else {
		return { 
			error: 'Please keep writing...' 
		}
	}
}

const getIPAddressHash = (request) => {
	// const ip = requestIp.getClientIp(request)
	const ip = null
	return ip
}

const generateRandomColor = () => {
	let colors = ['FFE15D', '1D9CF0', '097CD0', 'F49D1A', 'DC3535', 'B01E68', 'CE49BF', 'A63EC5', '7743DB', '3B3486', '2146C7', '0008C1', 'E6CBA8', '2192FF', '38E54D', '9CFF2E', '379237', '54B435', '82CD47', 'EA047E', 'FF6D28', '00F5FF', 'FF5403', '3AB0FF', '6D9886', '393E46', '66BFBF', '000000', '474E68', '6B728E', '404258', '7DE5ED', '0096FF', '00D7FF']
	const num = Math.floor(Math.random() * colors?.length) + 0
	return colors[num]
}

const getInitials = (name=null) => {
	if (name) {
		let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
		let initials = [...name.matchAll(rgx)] || []
		return initials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase()
	}
	return null
}

const urlToObject= async (img, name) => {
	const response = await fetch(img)
	const blob = await response.blob()
	const file = new File([blob], `${name}.png`, {type: blob.type})
	return file
}

const generateRandomAvatar = async (name) => {
	const initials = getInitials(name)
	const color = generateRandomColor()
	const img = await urlToObject(`https://ui-avatars.com/api/?background=${color}&name=${initials}&bold=true&color=FFFFFF&size=200`, initials)
	return img
}

const randomID = (length) => {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}


export {
	fetcher,
	randomID,
	getInitials,
	getIPAddressHash,
	searchForAuthors,
	generateRandomAvatar
}