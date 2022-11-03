

const ContentContainer = ({ children, title }) => {

	return <>
		<div className="w-full max-w-4xl mx-auto px-5 md:px-10 my-8 md:mt-8 mb-14">
			<h1 className="w-full text-center text-2xl md:text-4xl lg:text-5xl">{title}</h1>
			<div className="w-full mt-6">{children}</div>
		</div>
	</>
}

export default ContentContainer