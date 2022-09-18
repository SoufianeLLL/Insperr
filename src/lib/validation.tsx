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
const capitalizer = (word) => {
	const name = word.split(" ")
	for (let i = 0; i < name.length; i++) {
		name[i] = name[i][0].toUpperCase() + (name[i].substr(1)).toLowerCase() + ' '
	}
	return name
}

// Sort Authors names by Alphabet
const authorsListWithAlphabet = (data) => {
	// data.sort((a, b) => a.name.localeCompare(b.name))
	const sorted = data.sort((a, b) => a.name > b.name ? 1 : -1)
	const grouped = sorted.reduce((groups, author) => {
		const letter = author.name.charAt(0)
		groups[letter] = groups[letter] || []
		groups[letter].push({
			name: capitalizer(author?.name),
			authorID: author?.authorID
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
	capitalizer,
	checkEmailValidation,
	authorsListWithAlphabet,
	checkPasswordValidation
}