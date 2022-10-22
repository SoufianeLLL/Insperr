
const Settings = {
	quote: {
		min_characters: 50,
		max_characters: 280,
		min_quota: 1,
		max_quota: 100,
	},
	products: [
		{
			id: null,
			name: 'Free',
			quotes: 10,
			price: 0,
			autoPost: false,
			api: false,
			priority_support: false
		},
		{
			id: "prod_MeLd38T9HtjbzY",
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
			id: "prod_MeLesTbqyESA2B",
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
			id: "prod_MeLfJlsElKrjs9",
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
	]
}


export {
	Settings
}