import Image from "next/image"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Modal } from "flowbite-react"
import BlueButton from "@/components/BlueButton"

const lastStep = 8
const steps = {
	1: {
		headline: 'Let\'s take a tour to see how it works',
		description: '...'
	},
	2: {
		headline: '2',
		description: '...2'
	},
	3: {
		headline: '3',
		description: '...3'
	},
	4: {
		headline: '4',
		description: '...4'
	},
	5: {
		headline: '5',
		description: '...5'
	},
	6: {
		headline: '6',
		description: '...6'
	},
	7: {
		headline: '7',
		description: '...7'
	},
	8: {
		headline: '8',
		description: '...8'
	}
}


const TourContainer = ({ show, callback }) => {

	const { theme } = useTheme()

	const [step, setStep] = useState(1)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [mounted])


	return <>
		<Modal show={show} size="xl" popup={true} onClose={() => callback(false)}>
			<div className="dark:bg-zinc-800 bg-white">
				<Modal.Header />
				<Modal.Body>
					<div className="w-full">
						<div className="mb-3 text-lg md:text-xl text-center font-normal">
							{steps[step]?.headline}
						</div>
						<div className="w-full">{steps[step]?.description}</div>
						<div className="mt-3">
							{mounted && 
								<Image 
									className="rounded-lg" 
									alt="Tour guide"
									unoptimized={true} 
									placeholder="blur" 
									width={step-1 === 0 ? 945 : 667} 
									height={step-1 === 0 ? 677 : 229} 
									src={require(`../../../public/images/photos/tour/00${step-1}${theme === 'dark' ? '_dark' : ''}.jpg`)} />
							}
						</div>
						<div className="w-full mt-4 flex items-center">
							<div className="w-full">
								<div onClick={() => setStep(step <= 1 ? 1 : (step-1))}>
									<BlueButton className={`${step > 1 ? 'bg-primary-500 hover:bg-primary-700' : 'bg-slate-300 hover:bg-slate-400 dark:bg-zinc-800 dark:hover:bg-zinc-900'} text-white`} fullWidth={false} text="Prev" isLink={false} /></div>
							</div>
							<div className="w-full flex justify-end">
								{step < lastStep ? 
									<div onClick={() => setStep(step < lastStep ? step+1 : lastStep)}>
										<BlueButton fullWidth={false} text="Next" isLink={false} /></div>
								:
									<div onClick={() => callback(false)}>
										<BlueButton className="bg-slate-300 hover:bg-slate-400 dark:bg-zinc-800 dark:hover:bg-zinc-900 text-white" fullWidth={false} text="Finish" isLink={false} /></div>
								}
							</div>
						</div>
					</div>
				</Modal.Body>
			</div>
		</Modal>
	</>
}

export default TourContainer