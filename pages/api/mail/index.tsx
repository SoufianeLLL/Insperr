const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


export default async (req, res) => {
	
	const { to, from, templateId, extraData } = req.body

	try {
		await sgMail.send({
			to,
			from: `${from}@insperr.com`,
			templateId,
			dynamicTemplateData: extraData,
		})

		res.status(200).json({ status: 'Ok' })
	}
	catch (error) {
		console.log(error)
		if (error.response) {
			res.status(500).json({ status: 'Error', message: error.response.body })
		}
	}
}