import Head from "next/head"
import Link from "next/link"


const _ErrorPage = () => {

	return (
		<>
			<Head>
				<title>404 This page could not be found.</title>
			</Head>
			<div className="error-page w-full flex items-center justify-center">
				<div className="container justify-center h-screen w-full flex items-center">
					<div className="w-full md:px-0 px-5 my-10 text-center">
						<h1 className="text-5xl md:text-7xl w-full inline-block">404</h1>
						<div className="text-4xl w-full mt-3 inline-block">PAGE NOT FOUND</div>
						<div className="mt-2 text-base">
							Go back to <Link href="/"><a className="text-blue-600 underline">homepage</a></Link> . Insperr.com
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default _ErrorPage