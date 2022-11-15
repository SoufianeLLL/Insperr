
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
			quotes: 400,
			autoPost: true,
			priority_support: true,
			api: true,
			requests: {
				create: 800,
				read: 20000
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
				create: 2000,
				read: 20000
			},
		},
		{
			id: "prod_MnzNF8dbncBGOD",
			name: 'Entreprise',
			quotes: 10000,
			autoPost: true,
			priority_support: true,
			api: true,
			requests: {
				create: 40000,
				read: 200000
			},
		}
	],
	notices: 'We are excited to announce that our <span class="font-semibold">beta</span> website is now <span class="font-semibold">live</span>! <br/> We would love for our <span class="font-semibold">Insperrers</span> to sign up and try out the service to help support us. Thank you for your continued support!'
}


export {
	Settings
}