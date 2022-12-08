
const sendEmail = async ({ to, from='support', templateId, extraData }) => {
	await fetch(`${process.env.NEXT_PUBLIC_URL_HOME}/api/mail`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			to,
			from,
			templateId,
			extraData
		})
	})
}

export default sendEmail
