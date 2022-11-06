

const Sidebar = ({ children, title, state=false, callback }) => {

	return <>
		<div onClick={() => callback(false)} style={{ zIndex: 1010 }} className={`${state ? 'block' : 'hidden'} fixed bg-black right-0 top-0 bottom-0 left-0 w-full bg-opacity-40 dark:bg-opacity-80 cursor-pointer`}></div>
		<div style={{ 
			zIndex: 1011,
			width: 'calc(100% - (1.5rem * 2))'
		}} className={`${state ? '-mr-0 translate-x-0' : '-mr-10 translate-x-full'} transition duration-400 transform fixed bg-white dark:bg-zinc-900 dark:text-white text-black xy-shadow dark:shadow right-6 top-6 bottom-6 rounded-lg max-w-lg p-5 pt-10 md:p-10 md:pt-14 overflow-scroll`}>
			<h4 className="w-full mb-4 fontBold text-xl text-primary-500 md text-3xl">{title}</h4>
			<div className="w-full">{children}</div>
			<div onClick={() => callback(false)} className="cursor-pointer w-full absolute top-4 left-0 right-0 text-sm text-black dark:text-white opacity-60 text-center">
					Close this window</div>
		</div>
	</>
}

export default Sidebar