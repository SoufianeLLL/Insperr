import Head from "next/head"
import ContentContainer from "@/components/Containers/ContentContainer"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"


const OurRoadMap = () => {

	return <>
		<Head>
            <link rel="canonical" href="https://insperr.com/roadmap" />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(
					{
						"@context": "https://schema.org",
						"@type": "NewsArticle",
						"headline": "Insperr Roadmap",
						"description": "Insperr roadmap is our vision, direction, priorities, and progress of the product.",
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
		<ContentContainer title="Our Roadmap">
			<div className="w-full px-5 md:px-10 py-14 border-l border-slate-200 dark:border-zinc-700">
				<div className="relative w-full my-12">
					<div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-zinc-700 absolute top-0 -left-12"></div>
					<div className="text-sm text-slate-500 dark:text-zinc-700 w-full mb-2">November, 2022</div>
					<div className="text-lg md:text-xl w-full mb-1 font-semibold">Documentation comming up</div>
					<div className="w-full text-base">
						We are building the Documentation page to give our customers a better understanding of how to use Insperr.
					</div>
				</div>
				<div className="relative w-full my-12">
					<div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-zinc-700 absolute top-0 -left-12"></div>
					<div className="text-sm text-slate-500 dark:text-zinc-700 w-full mb-2">December, 2022</div>
					<div className="text-lg md:text-xl w-full mb-1 font-semibold">APIs</div>
					<div className="w-full text-base">
						Insperr APIs are programmatic interfaces to Insperr services. Allowing you to easily add the power of everything we offer to your applications.
					</div>
				</div>
			</div>
		</ContentContainer>
	</>
}


OurRoadMap.getLayout = (page) => <UnauthenticatedLayout title="Insperr – Our Roadmap">{page}</UnauthenticatedLayout>

export default OurRoadMap