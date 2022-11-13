import Image from 'next/image'

const AvatarContainer = ({ height=50, width=50, avatar }) => {
    return <>
        {avatar ? 
            <Image 
                alt="avatar"
                className="inline-block rounded-full"
                src={avatar}
                blurDataURL={'../../../public/images/avatar.jpg'} 
                unoptimized={true} 
                height={height}
                width={width} />
        :
            <Image 
                alt="avatar"
                className="inline-block rounded-full"
                src={require('../../../public/images/avatar.jpg')} 
                placeholder="blur"
                unoptimized={true} 
                height={height}
                width={width} />
            }
    </>
}

export default AvatarContainer