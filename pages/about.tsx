import Head from "next/head"
import Script from "next/script"
import ContentContainer from "@/components/Containers/ContentContainer"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"


const Aboutus = () => {

	return <>
		<Head>
			<link rel="canonical" href="https://insperr.com/about" />
			<Script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(
					{
						"@context": "https://schema.org",
						"@type": "NewsArticle",
						"headline": "About Insperr, Quotes generator",
						"description": "Insperr is a simple online tool with which you can generate thousands of quotes sorted by category. You can choose from different categories.",
						"datePublished": "2022-11-18T08:00:00+08:00",
						"dateModified": "2022-11-18T09:20:00+08:00",
						"publisher": {
							"@type": "Organization",
							"name": "Insperr",
							"logo": {
								"@type": "ImageObject",
								"url": false
							}
						},
						"mainEntityOfPage":{
							"@type": "WebPage",
							"@id": "https://insperr.com"
						},
						"author":{
							"@type": "Person",
							"name": "Soufiane Loudaini"
						},
						"image":{
							"@type": "ImageObject",
							"url": "https://bgrlgcryhzmokadamxuz.supabase.co/storage/v1/object/public/structured-data/home.png"
						}
					}
				)}}
			/>
		</Head>
		<ContentContainer title="About us">
			Working on it...
		</ContentContainer>
	</>
}


Aboutus.getLayout = (page) => <UnauthenticatedLayout title="Insperr – About us">{page}</UnauthenticatedLayout>

export default Aboutus