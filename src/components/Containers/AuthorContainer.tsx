// import Image from "next/image"
import { 
	capitalizer, 
	//sluging 
} from "@/lib/validation"


const AuthorContainer = ({ author, classes=null }) => {

	// const imgSrc = `/images/photos/authors/${sluging(author)}.jpg`

	return <>
		<div className={`${classes} truncate overflow-hidden cursor-pointer flex items-center gap-2 flex-none`}>
			{/* <span className="flex-none overflow-hidden rounded-full h-8 w-8">
				<Image 
					className="rounded-full"
					src={require('../../../public/images/avatar.jpg')} 
					placeholder="blur"
					unoptimized={true} 
					height={30}
					width={30} />
			</span> */}
			<span className="flex-none pr-2">{capitalizer(author)}</span>
		</div>
	</>
}

export default AuthorContainer