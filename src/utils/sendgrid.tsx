import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendEmail = async ({ to, from='support', templateId, extraData }) => {
	try {
		await sgMail.send({
			to,
			from: `${from}@insperr.com`,
			templateId,
			dynamicTemplateData: extraData,
		})
	}
	catch (error) {
		console.error(error)
		if (error.response) {
			console.error(error.response.body)
		}
	}
}

export default sendEmail
