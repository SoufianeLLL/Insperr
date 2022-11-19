import Head from "next/head"
import ContentContainer from "@/components/Containers/ContentContainer"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"


const Privacy = () => {

	return <>
		<Head>
			<link rel="canonical" href="https://insperr.com/privacy" />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(
					{
						"@context": "https://schema.org",
						"@type": "NewsArticle",
						"headline": "Insperr Privacy Policiy",
						"description": "Insperr Privacy Policy document contains the types of information that is collected and recorded by Insperr and how we use it.",
						"datePublished": "2022-11-18T08:00:00+08:00",
						"dateModified": "2022-11-18T09:20:00+08:00",
						"publisher": {
							"@type": "Organization",
							"name": "Insperr",
							"logo": {
								"@type": "ImageObject",
								"url": false
							}
						},
						"mainEntityOfPage":{
							"@type": "WebPage",
							"@id": "https://insperr.com"
						},
						"author":{
							"@type": "Person",
							"name": "Soufiane Loudaini"
						},
						"image":{
							"@type": "ImageObject",
							"url": "https://bgrlgcryhzmokadamxuz.supabase.co/storage/v1/object/public/structured-data/home.png"
						}
					}
				)}}
			/>
		</Head>
		<ContentContainer title="Privacy Policiy">
			<div className="w-full my-6 text-sm text-slate-">Last update: Thursday, November 2022</div>
			<div className="w-full text-base">
				At Insperr, accessible from https://insperr.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains the types of information that is collected and recorded by Insperr and how we use it.
				<br />
				If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
				<br />
				This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Insperr. This policy does not apply to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Free Privacy Policy Generator.
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">Consent</div>
				By using our website, you hereby consent to our Privacy Policy and agree to its terms.
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">Information we collect</div>
				The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
				<br />
				If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
				<br />
				When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">How we use your information</div>
				We use the information we collect in various ways, including:
				<ul className="w-full mt-3 px-5 md:px-10 list-disc">
					<li className="w-full my-2">Provide, operate, and maintain our website</li>
					<li className="w-full my-2">Improve, personalize, and expand our website</li>
					<li className="w-full my-2">Understand and analyze how you use our website</li>
					<li className="w-full my-2">Develop new products, services, features, and functionality</li>
					<li className="w-full my-2">Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
					<li className="w-full my-2">Send you emails</li>
					<li className="w-full my-2">Find and prevent fraud</li>
				</ul>

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">Log Files</div>
				Insperr follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and are a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">Cookies and Web Beacons</div>
				Like any other website, Insperr uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">Advertising Partners Privacy Policies</div>
				You may consult this list to find the Privacy Policy for each of the advertising partners of Insperr.
				<br />
				Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Insperr, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
				<br />
				Note that Insperr has no access to or control over these cookies that are used by third-party advertisers.
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">Third-Party Privacy Policies</div>
				Insperr's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt out of certain options.
				You can choose to disable cookies through your browser options. To know more detailed information about cookie management with specific web browsers, it can be found on the browsers' respective websites.
			   
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">CCPA Privacy Rights</div>
				(Do Not Sell My Personal Information). Under the CCPA, among other rights, California consumers have the right to:
				<ul className="w-full mt-3 px-5 md:px-10 list-disc">
					<li className="w-full my-2">Request that a business that collects a consumer's data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
					<li className="w-full my-2">Request that a business deletes any personal data about the consumer that a business has collected.</li>
					<li className="w-full my-2">Request that a business that sells a consumer's data, not sell the consumer's data.</li>
					<li className="w-full my-2">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</li>
				</ul>
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">GDPR Data Protection Rights</div>
				We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
				<ul className="w-full mt-3 px-5 md:px-10 list-disc">
					<li className="w-full my-2">The right to access – You have the right to request copies of your data. We may charge you a small fee for this service.</li>
					<li className="w-full my-2">The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
					<li className="w-full my-2">The right to erasure – You have the right to request that we erase your data, under certain conditions.</li>
					<li className="w-full my-2">The right to restrict processing – You have the right to request that we restrict the processing of your data, under certain conditions.</li>
					<li className="w-full my-2">The right to object to processing – You have the right to object to our processing of your data, under certain conditions.</li>
					<li className="w-full my-2">The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
					<li className="w-full my-2">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</li>
				</ul>
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold uppercase">Children's Information</div>
				Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
				Insperr does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
			</div>
		</ContentContainer>
	</>
}


Privacy.getLayout = (page) => <UnauthenticatedLayout title="Insperr – Privacy Policiy">{page}</UnauthenticatedLayout>

export default Privacy