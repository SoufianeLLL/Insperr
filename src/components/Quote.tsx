import { Tooltip } from "flowbite-react"
import AvatarContainer from "@/components/Containers/AvatarContainer"


const Quote = ({ quote }) => {

	return <>
		<div className="w-full max-w-xl rounded-2xl shadow-lg hover:shadow-xl p-5 md:p-8 bg-white dark:bg-zinc-900">
			<div className="w-full">
				<div className="w-full flex items-center gap-x-4">
					<div className="flex-none inherit">
						<AvatarContainer avatar={quote?.avatar} width={50} height={50} />
					</div>
					<div className="w-full shrink">
						<div className="w-full text-xl font-semibold flex items-center gap-x-2">
							<span>{quote?.fullname}</span>
							<Tooltip content="Verified" placement="bottom">
								<svg className="text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg>
							</Tooltip>
						</div>
						<div className="text-base -mt-1 text-slate-600 dark:text-zinc-600 w-full">@{quote?.username}</div>
					</div>
				</div>
				<div className="w-full inline-block mt-3 text-lg md:text-xl font-medium">{quote?.content}</div>
				{quote?.tags && 
				<div className="w-full inline-block mt-1 text-lg md:text-xl">
					{quote?.tags?.map((tag, i) => {
						return <span key={i} className="tag float-left mr-4 mb-3 text-primary-500 cursor-pointer hover:text-primary-700 transition-all">
							#{tag}</span>
					})}
				</div>}
				<div className="w-full inline-block mt-3 flex items-center justify-between pr-5">
					<Tooltip content="Add to Bookmarks">
						<span><svg className="cursor-pointer w-5 h-5 text-slate-400 dark:text-zinc-600 hover:text-primary-500" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M5 1v21l7-5 7 5V1z"></path></svg></span>
					</Tooltip>
					<Tooltip content="Retweet">
						<div><svg className="cursor-pointer w-6 h-6 text-slate-400 dark:text-zinc-600 hover:text-primary-500" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z"/></svg></div>
					</Tooltip>
					<Tooltip content="Clone">
						<div><svg className="text-slate-400 dark:text-zinc-600 hover:text-primary-500 cursor-pointer w-6 h-6" fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></div>
					</Tooltip>
					<div className="blank"></div>
				</div>
			</div>
		</div>
	</>
}

export {
	Quote
}