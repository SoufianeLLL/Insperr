import { GetStaticProps } from "next"
import Link from "next/link"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"


export const getStaticProps: GetStaticProps<{}> = async () => {
	return {
		props: { quotes: [] },
	}
}

const BrowsePage = () => {

	return <>
		<section className="w-full px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-5 overflow-hidden">
				<div className="heading w-full">
					<div className="text-xl md:text-2xl font-semibold w-full">Trending</div>
				</div>
				<div className="mt-8 w-full grid grid-cols-3 gap-6">
					<div className="bg-white h-60 rounded-md"></div>
					<div className="bg-white h-60 rounded-md"></div>
					<div className="bg-white h-60 rounded-md"></div>
					<div className="bg-white h-60 rounded-md"></div>
					<div className="bg-white h-60 rounded-md"></div>
					<div className="bg-white h-60 rounded-md"></div>
					<div className="bg-white h-60 rounded-md"></div>
					<div className="bg-white h-60 rounded-md"></div>
					<div className="bg-white h-60 rounded-md"></div>
				</div>
			</div>
		</section>
	</>
}

BrowsePage.getLayout = (page) => <UnauthenticatedLayout>{page}</UnauthenticatedLayout>

export default BrowsePage