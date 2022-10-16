import TopicsList from "@/utils/topics.json"


// Check if the email is valid
const checkEmailValidation = (email=null) => {
	if ( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) && email ) {
		return true
	}
	return false
}

// Check if the password contains at least 1 upercase letter, 
// 1 lowercase letter, 1number and between 5-15 word
const checkPasswordValidation = (password=null) => {
	if ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/.test(password) && password) {
		return true
	}
	return false
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

// Format date 
const dateFormat = (date) => {
	return [date.getFullYear(), date.getMonth()+1, date.getDate()]
		.join('-')+' '+
		[date.getHours(), date.getMinutes(), date.getSeconds()]
		.join(':')
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

export {
	topic,
	sluging,
	dateFormat,
	capitalizer,
	checkEmailValidation,
	authorsListWithAlphabet,
	checkPasswordValidation
}