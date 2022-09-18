
const checkEmailValidation = (email=null) => {
	if ( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) && email ) {
		return true
	}
	return false
}

const checkPasswordValidation = (password=null) => {
	if ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/.test(password) && password) {
		return true
	}
	return false
}

const capitalizer = (word) => {
	const name = word.split(" ")
	for (let i = 0; i < name.length; i++) {
		name[i] = name[i][0].toUpperCase() + (name[i].substr(1)).toLowerCase() + ' '
	}
	return name
}

export {
	capitalizer,
	checkEmailValidation,
	checkPasswordValidation
}