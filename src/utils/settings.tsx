
const Settings = {
	quote: {
		min_characters: 100,
		max_characters: 280,
		min_quota: 1,
		max_quota: 10,
	},
	products: [
		{
			id: "free",
			name: 'Free',
			quotes: 10,
			price: 0,
			autoPost: false,
			api: false,
			priority_support: false
		},
		{
			id: "prod_MnzOyzn6WfqPbq",
			name: 'Pro',
			quotes: 500,
			autoPost: true,
			priority_support: true,
			api: true,
			requests: {
				create: 300,
				read: 1000
			},
		},
		{
			id: "prod_MnzOqIzvijapTp",
			name: 'Elite',
			quotes: 1000,
			autoPost: true,
			priority_support: true,
			api: true,
			requests: {
				create: 700,
				read: 5000
			},
		},
		{
			id: "prod_MnzNF8dbncBGOD",
			name: 'Entreprise',
			quotes: 2000,
			autoPost: true,
			priority_support: true,
			api: true,
			requests: {
				create: 1200,
				read: 200000
			},
		}
	],
	notices: 'We are excited to announce that our <span class="font-semibold">beta</span> website is now <span class="font-semibold">live</span>! <br/> We would love for our <span class="font-semibold">Insperrers</span> to sign up and try out the service to help support us. Thank you for your continued support!'
}


export {
	Settings
}