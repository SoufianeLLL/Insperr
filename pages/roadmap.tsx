import ContentContainer from "@/components/Containers/ContentContainer"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"


const OurRoadMap = () => {

	return <>
		<ContentContainer title="Our Roadmap">
			<div className="w-full px-5 md:px-10 py-14 border-l border-slate-200">
				<div className="relative w-full my-12">
					<div className="w-4 h-4 rounded-full bg-slate-200 absolute top-0 -left-12"></div>
					<div className="text-sm text-slate-500 w-full mb-2">November, 2022</div>
					<div className="text-lg md:text-xl w-full mb-1 font-semibold">Documentation comming up</div>
					<div className="w-full text-base">
						We are building the Documentation page to give our customers a better understanding of how to use Insperr.
					</div>
				</div>
				<div className="relative w-full my-12">
					<div className="w-4 h-4 rounded-full bg-slate-200 absolute top-0 -left-12"></div>
					<div className="text-sm text-slate-500 w-full mb-2">November, 2022</div>
					<div className="text-lg md:text-xl w-full mb-1 font-semibold">Dark mode</div>
					<div className="w-full text-base">
						Dark Mode is a feature that helps you quickly turn the screen (browser) to dark at night time.
					</div>
				</div>
				<div className="relative w-full my-12">
					<div className="w-4 h-4 rounded-full bg-slate-200 absolute top-0 -left-12"></div>
					<div className="text-sm text-slate-500 w-full mb-2">November - December, 2022</div>
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