import TopicsList from "@/utils/topics.json"


// Check if the email is valid
const checkEmailValidation = (email) => {
	const emailRegex = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (!emailRegex) {
		return 'Please fill out your email address'
	}
	return emailRegex.test(email) ? null : 'Please enter a valid email address.'
}

// Check if the password contains at least 1 upercase letter, 
// 1 lowercase letter, 1number and between 5-15 word
const checkPasswordValidation = (password) => {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/
	if (!password) {
		return 'Please fill out your password'
	}
	return passwordRegex.test(password) ? null : 'Your password must contain lowercase letters, uppercase letters, numbers and must be between 8 and 15 characters.'
}

// Check if the username contains more than 5 characters and less tha 15,
// Not having spaces
const checkUsernameValidation = (username) => {
	const usernameRegex = /^(?! .* [ ]{2} )[a-zA-Z0-9_]{5,15}[a-zA-Z]+[0-9]*$/
	if (!username) {
		return 'Please fill out your username'
	}
	else if (username?.length > 15) {
		return 'Your username must be shorter than 15 characters.'
	}
	else if (username?.length < 5) {
		return 'Your username must be longer than 5 characters.'
	}
	return usernameRegex.test(username) ? null : 'Your username must have at least one letter, nor special characters allowed only the underscore.'
}

// Capitalize first letter of each word
const capitalizer = (word, dash=false) => {
	const name = (dash ? word?.replace(/_/g,' ') : word?.replace(/ +(?= )/g,''))?.split(' ')
	let correctName = ''
	if (name && name.length >= 1) {
		for (let i = 0; i < name.length; i++) {
			if (name[i]) {
				correctName += name[i][0].toUpperCase() + (name[i].substr(1)).toLowerCase() + ' '
			}
		}
		return correctName
	}
	return word
}

// Create slug from the word
const sluging = (word) => {
	const slug = (word?.toLowerCase())?.replace(/\s/g,'_')
	return slug
}

// Get the Topic name from the topic's quote
const topic = (list) => {
	let topics = [], l = list?.toString()
	if (l) {
		for (let i = 0; i < TopicsList.length; i++) {
			if (l?.toLowerCase()?.indexOf(TopicsList[i]?.toLowerCase()) > -1) {
				topics.push(TopicsList[i])
			}
		}
	}
	return topics
}

// Timestamp to date
const timestampToDate = (timestamp) => {
	const date = new Date(timestamp * 1000)
	var year = date.getFullYear()
	var month = ("0" + (date.getMonth() + 1)).slice(-2)
	var day = ("0" + date.getDate()).slice(-2)
	var hour = ("0" + date.getHours()).slice(-2)
	var minutes = ("0" + date.getMinutes()).slice(-2)
	var seconds = ("0" + date.getSeconds()).slice(-2)

	const formattedTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds 
	return formattedTime
}

// Format date 
const dateFormat = (date, lastHour=false) => {
	return [date.getFullYear(), date.getMonth()+1, date.getDate()]
		.join('-')+' '+ (lastHour ? '24:00:00' : ([(date.getHours(), date.getMinutes(), date.getSeconds())].join(':')))
}

// Sort Authors names by Alphabet
const authorsListWithAlphabet = (data) => {
	// const sorted = data.sort((a, b) => a.name.localeCompare(b.name))
	const sorted = data.sort((a, b) => a.name > b.name ? 1 : -1)
	const grouped = sorted.reduce((groups, author) => {
		const letter = author?.name?.charAt(0)
		groups[letter] = groups[letter] || []
		groups[letter].push({
			name: author?.name ?? capitalizer(author?.name),
			id: author?.id
		})
		return groups
	}, {})
	const result = Object.keys(grouped)
		.map(key => ({
			key, 
			list: grouped[key]
		}))
	return result
}

/**
 * Time ago func
 */
const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
]
const getFormattedDate = (date, prefomattedDate = null, hideYear = false) => {
	const day = date.getDate()
	const month = MONTH_NAMES[date.getMonth()]
	const year = date.getFullYear()
	const hours = date.getHours()
	let minutes = date.getMinutes()
  
	if (minutes < 10) {
		// Adding leading zero to minutes
		minutes = `0${ minutes }`
	}
	if (prefomattedDate) {
		// Today at 10:20
		// Yesterday at 10:20
		return `${ prefomattedDate } at ${ hours }:${ minutes }`
	}
	if (hideYear) {
		// 10. January at 10:20
		return `${ day }. ${ month } at ${ hours }:${ minutes }`
	}
	// 10. January 2017. at 10:20
	return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`
}
const timeAgo = (dateParam) => {
	if (!dateParam) {
		return null
	}
  
	const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam)
	const DAY_IN_MS = 86400000 // 24 * 60 * 60 * 1000
	const today = new Date()
	const yesterday = new Date(new Date()?.valueOf() - DAY_IN_MS)
	const seconds = Math.round((new Date()?.valueOf() - date) / 1000)
	const minutes = Math.round(seconds / 60)
	const days = Math.round(seconds / 86400)
	const months = Math.round(seconds / 2592000)
	const isToday = today.toDateString() === date.toDateString()
	const isYesterday = yesterday.toDateString() === date.toDateString()
	const isThisYear = today.getFullYear() === date.getFullYear()

	if (seconds < 5) {
		return 'now'
	}
	else if (seconds < 60) {
		return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`
	}
	else if (seconds < 90) {
		return 'about a minute ago'
	}
	else if (minutes < 60) {
		return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
	}
	else if (days >= 1 && days < 24) {
		return `${days} ${days === 1 ? 'day' : 'days'} ago`
	}
	else if (months >= 1 && months < 12) {
		return `${months} ${months === 1 ? 'month' : 'months'} ago`
	}
	else if (isToday) {
		return getFormattedDate(date, 'Today') // Today at 10:20
	}
	else if (isYesterday) {
		return getFormattedDate(date, 'Yesterday') // Yesterday at 10:20
	}
	else if (isThisYear) {
		return getFormattedDate(date, false, true) // 10. January at 10:20
	}
  
	return getFormattedDate(date) // 10. January 2017. at 10:20
}



export {
	topic,
	sluging,
	timeAgo,
	dateFormat,
	capitalizer,
	timestampToDate,
	checkEmailValidation,
	checkUsernameValidation,
	authorsListWithAlphabet,
	checkPasswordValidation
}