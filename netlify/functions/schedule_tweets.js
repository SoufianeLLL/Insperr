const { schedule } = require('@netlify/functions')

const handler = async function(event, context) {
	// Schedule all untweeted tweets for users who turned AutoPost ON
	await fetch(`https://insperr.com/api/crons/tweet?API_SECRET_KEY=${process.env.API_SECRET_KEY}`)

	return {
		statusCode: 200,
	}
}

exports.handler = schedule("*/5 * * * *", handler)