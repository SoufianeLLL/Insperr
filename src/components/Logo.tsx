

const Logo = ({ 
	size=40,
	showText=true,
	text='text-xl',
	i='text-primary-500 hover:text-primary-600' }) => {

	return <div className={`text-black dark:text-white dark:hover:text-white hover:text-black -mt-0.5 insperr-logo flex items-center gap-3`}>
		<svg className={`${i}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 712 980">
			<g>
				<polygon points="0 698.808 404.268 698.808 404.268 980.532 667.057 980.532 667.057 436.019 0 436.019 0 698.808" fill="currentColor"/>
				<circle cx="530.0192" cy="182.0838" r="182.0838" fill="currentColor"/>
			</g>
		</svg>
		{showText && <span className={`fontInter font-semibold ${text}`}>Insperr.com</span> }
	</div>
}

export default Logo