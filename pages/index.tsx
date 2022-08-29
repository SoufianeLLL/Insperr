import Layout from "@/components/Layout"
import Link from "next/link"


const Index = () => {

	return <Layout home={true}>
		<section className="w-full px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="search-section relative w-full mx-auto max-w-2xl mt-20">
				<h2 className="w-full mb-3 text-center text-2xl md:text-3xl fontSemiBold">Who said it</h2>
				<input type="text" className="text-center  w-full py-4 px-7 rounded-full text-xl border-2 border-zinc-300 dark:border-zinc-600 placeholder-zinc-300 outline-none focus:ring-none bg-white pr-14" placeholder="e.g. Steve Jobs, Elon Musk ..." />
			</div>
		</section>
		<section className="w-full bg-zinc-100 mt-14 overflow-hidden">
			<div className="w-full px-10 2xl:px-0 max-w-7xl overflow-hidden mx-auto">
				<div className="w-full my-12 text-base overflow-hidden">
					<div className="heading w-full">
						<div className="text-xl md:text-2xl font-semibold w-full">Popular profiles</div>
					</div>
					<div className="mt-6 w-full flex items-center overflow-x-scroll profiles-scroll p-2 gap-6">
						<div className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
							<span className="flex-none">Elon Musk</span>
						</div>
						<div className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
							<span className="flex-none">Cristiano Ronaldo</span>
						</div>
						<div className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
							<span className="flex-none">Zlatan Ibrahimovic</span>
						</div>
						<div className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
							<span className="flex-none">Steve Jobs</span>
						</div>
						<div className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
							<span className="flex-none">Tom Brady</span>
						</div>
						<div className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
							<span className="flex-none">Micheal Jordan</span>
						</div>
						<div className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
							<span className="flex-none">Jacky Chan</span>
						</div>
						<div className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
							<span className="flex-none">Bruss Lee</span>
						</div>
						<div className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
							<span className="flex-none">Serena Wiliams</span>
						</div>
						<Link href="#"><a className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
							<span className="flex-none bg-white rounded-full h-8 w-0"></span>
							<span className="flex-none">More profiles</span>
						</a></Link>
					</div>
				</div>
			</div>
		</section>
		<section className="w-full px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-20 overflow-hidden">
				<div className="heading w-full">
					<div className="text-xl md:text-2xl font-semibold w-full">Trending</div>
				</div>
				<div className="mt-8 w-full grid grid-cols-3 gap-6">
					<div className="bg-zinc-100 h-60 rounded-md"></div>
					<div className="bg-zinc-100 h-60 rounded-md"></div>
					<div className="bg-zinc-100 h-60 rounded-md"></div>
					<div className="bg-zinc-100 h-60 rounded-md"></div>
					<div className="bg-zinc-100 h-60 rounded-md"></div>
					<div className="bg-zinc-100 h-60 rounded-md"></div>
					<div className="bg-zinc-100 h-60 rounded-md"></div>
					<div className="bg-zinc-100 h-60 rounded-md"></div>
					<div className="bg-zinc-100 h-60 rounded-md"></div>
				</div>
			</div>
		</section>
	</Layout>
}

export default Index