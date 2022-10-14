import { Configuration, OpenAIApi } from 'openai'
import { supabaseServerClient } from '@supabase/auth-helpers-nextjs'

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
	
	const query = req?.query
    let data

	if (query?.phrase && query?.category && query?.engine && query?.quota && query?.characters) {
		data = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `Generate a new quote from scratch about ${query?.category}\n`,
            temperature: 0.8,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 1,
        })

        console.log(data)
	}

	return res.status(200).json(data)
}