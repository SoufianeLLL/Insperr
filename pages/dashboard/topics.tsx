import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import TopicsList from "@/components/TopicsList"


const DashAuthorsPage = () => {

	return <>
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-10">
				<div className="heading w-full">
					<div className="text-2xl text-center fontSemiBold md:text-3xl font-semibold w-full">Browse by Topics</div>
					<div className="w-full mt-4 text-xl md text-2xl text-center px-10 max-w-3xl mx-auto">
						Looking for a quote from your favorite topic? Our quote collections are organized by topic to help you find the perfect quote.
					</div>
				</div>
				<div className="w-full mt-10">
                    <TopicsList />
                </div>
			</div>
		</section>
	</>
}


DashAuthorsPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default DashAuthorsPage