import Image from "next/image"
import { useState } from "react"
import { capitalizer, sluging } from "@/lib/validation"

const AuthorContainer = ({ author, classes=null }) => {

	const [imgSrc, setImgSrc] = useState(`/images/photos/authors/${sluging(author)}.jpg`)
	
	return <>
		<div className={`${classes} truncate overflow-hidden cursor-pointer flex items-center gap-2 flex-none`}>
			<span className="flex-none overflow-hidden rounded-full h-10 w-10">
				<Image 
					className="rounded-full"
					src={imgSrc} 
					onError={() => setImgSrc('/images/avatar.jpg')}
					blurDataURL="/images/avatar.jpg"
					placeholder="blur"
					unoptimized={true} 
					height={40}
					width={40} />
			</span>
			<span className="flex-none pr-2">{capitalizer(author)}</span>
		</div>
	</>
}

export default AuthorContainer