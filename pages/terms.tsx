import Head from "next/head"
import ContentContainer from "@/components/Containers/ContentContainer"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"


const TermsOfUse = () => {

	return <>
		<Head>
            <link rel="canonical" href="https://insperr.com/terms" />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(
					{
						"@context": "https://schema.org",
						"@type": "NewsArticle",
						"headline": "Insperr Terms and Conditions",
						"description": "These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Insperr...",
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
							"url": "https://lbthopsukieuyitlwkmw.supabase.co/storage/v1/object/public/structured-data/home.png"
						}
					}
				)}}
			/>
        </Head>
		<ContentContainer title="Terms & Conditions">
			<div className="w-full my-6 text-sm text-slate-">Last update: Thursday, November 2022</div>
			<div className="w-full text-base normal-case">
				These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Insperr ("Company", “we”, “us”, or “our”), concerning your access to and use of the https://insperr.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). We are registered in England.You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Use.
				<div className="W-full mt-2 font-semibold">If you do not agree with all of these terms of use, then you are expressly prohibited from using the site and you must discontinue use immediately.</div>
				Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. <br/> We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use from time to time. <br/> We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive any right to receive specific notice of each such change. <br/> Please ensure that you check the applicable Terms every time you use our Site so that you understand which Terms apply. <br/> You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted. <br/>  
				The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. <br/> Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable. <br/> 
				The Site is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Site. <br/> You may not use the Site in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
				The Site is intended for users who are at least 13 years of age. <br/> All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. <br/> If you are a minor, you must have your parent or guardian read and agree to these Terms of Use before you using the Site.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">INTELLECTUAL PROPERTY RIGHTS</div>
				Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. <br/> The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. <br/> Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
				Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. <br/> We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">USER REPRESENTATIONS</div>
				By using the Site, you represent and warrant that: 
				<ul className="w-full mt-3 px-5 md:px-10 list-decimal">
					<li className="w-full my-2">All registration information you submit will be true, accurate, current, and complete.</li>
					<li className="w-full my-2">You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
					<li className="w-full my-2">You have the legal capacity and you agree to comply with these Terms of Use.</li>
					<li className="w-full my-2">You are not under the age of 13.</li>
					<li className="w-full my-2">You are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site.</li>
					<li className="w-full my-2">You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
					<li className="w-full my-2">You will not use the Site for any illegal or unauthorized purpose.</li>
					<li className="w-full my-2">Your use of the Site will not violate any applicable law or regulation.</li>
				</ul>
				If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any current or future use of the Site (or any portion thereof). <br/> 

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">USER REGISTRATION</div>
				You may be required to register with the Site. <br/> You agree to keep your password confidential and will be responsible for all use of your account and password. <br/> We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">FEES AND PAYMENT</div>
				We accept the following forms of payment:
				<ul className="w-full my-2">
					<li>-  Visa</li>
					<li>-  Mastercard</li>
					<li>-  American Express</li>
					<li>-  Discover</li>
				</ul>
				You may be required to purchase or pay a fee to access some of our services. <br/> You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. <br/> You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. <br/> We bill you through an online billing account for purchases made via the Site. <br/> Sales tax will be added to the price of purchases as deemed required by us. <br/> We may change prices at any time. <br/> All payments shall be in U.S. dollars.
				You agree to pay all charges or fees at the prices then in effect for your purchases, and you authorize us to charge your chosen payment provider for any such amounts upon making your purchase. If your purchase is subject to recurring charges, then you consent to our charging your payment method regularly without requiring your prior approval for each recurring charge, until you notify us of your cancellation. <br/> 
				We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment. <br/> We also reserve the right to refuse any order placed through the Site.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">CANCELLATION</div>
				You can cancel your subscription at any time by logging into your account. <br/> Your cancellation will take effect at the end of the current paid term. <br/> 
				If you are unsatisfied with our services, please email us atsupport@insperr.com.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">PROHIBITED ACTIVITIES</div>
				
				You may not access or use the Site for any purpose other than that for which we make the Site available. <br/> The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. <br/>  
				As a user of the Site, you agree not to:
				<ul className="w-full mt-3 px-5 md:px-10 list-decimal">
					<li className="w-full my-2">Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
					<li className="w-full my-2">Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
					<li className="w-full my-2">Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.</li>
					<li className="w-full my-2">Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
					<li className="w-full my-2">Use any information obtained from the Site to harass, abuse, or harm another person.</li>
					<li className="w-full my-2">Make improper use of our support services or submit false reports of abuse or misconduct.</li>
					<li className="w-full my-2">Use the Site in a manner inconsistent with any applicable laws or regulations.</li>
					<li className="w-full my-2">Engage in unauthorized framing of or linking to the Site.</li>
					<li className="w-full my-2">Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.</li>
					<li className="w-full my-2">Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
					<li className="w-full my-2">Delete the copyright or other proprietary rights notice from any Content.</li>
					<li className="w-full my-2">Attempt to impersonate another user or person or use the username of another user.</li>
					<li className="w-full my-2">Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “PCM”).</li>
					<li className="w-full my-2">Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
					<li className="w-full my-2">Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.</li>
					<li className="w-full my-2">Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.</li>
					<li className="w-full my-2">Copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
					<li className="w-full my-2">Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.</li>
					<li className="w-full my-2">Except as may be the result of the standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.</li>
					<li className="w-full my-2">Use a buying agent or purchasing agent to make purchases on the Site.</li>
					<li className="w-full my-2">Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means to send unsolicited emails, or create user accounts by automated means or under pretenses.</li>
					<li className="w-full my-2">Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
					<li className="w-full my-2">Use the Site to advertise or offer to sell goods and services.</li>
				</ul>

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">USER GENERATED CONTRIBUTIONS</div>
				The Site does not offer users the to submit or post content. <br/> We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). <br/> Contributions may be viewable by other users of the Site and through third-party websites. <br/> As such, any Contributions you transmit may be treated following the Site Privacy Policy. <br/> When you create or make available any Contributions, you thereby represent and warrant that:
				<ul className="w-full mt-3 px-5 md:px-10 list-decimal">
					<li className="w-full my-2">The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
					<li className="w-full my-2">You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Site, and other users of the Site to use your Contributions in any manner contemplated by the Site and these Terms of Use.</li>
					<li className="w-full my-2">You have the written consent, release, and/or permission of every identifiable person in your Contributions to use the name or likeness of every such identifiable person to enable inclusion and use of your Contributions in any manner contemplated by the Site and these Terms of Use.</li>
					<li className="w-full my-2">Your Contributions are not false, inaccurate, or misleading.</li>
					<li className="w-full my-2">Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
					<li className="w-full my-2">Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).</li>
					<li className="w-full my-2">Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
					<li className="w-full my-2">Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.</li>
					<li className="w-full my-2">Your Contributions do not violate any applicable law, regulation, or rule.</li>
					<li className="w-full my-2">Your Contributions do not violate the privacy or publicity rights of any third party.</li>
					<li className="w-full my-2">Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.</li>
					<li className="w-full my-2">Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
					<li className="w-full my-2">Your Contributions do not otherwise violate, or link to material that violates any provision of these Terms of Use, or any applicable law or regulation.</li>
				</ul>
				Any use of the Site in violation of the foregoing violates these Terms of Use and may result in, among other things, termination or suspension of your rights to use the Site.
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">CONTRIBUTION LICENSE</div>
				You and the Site agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).
				By submitting suggestions or other feedback regarding the Site, you agree that we can use and share such feedback for any purpose without compensation to you.
				We do not assert any ownership over your Contributions. <br/> You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. <br/> We are not liable for any statements or representations in your Contributions provided by you in any area on the Site. <br/> You are solely responsible for your Contributions to the Site and you expressly agree to exonerate us from any responsibility and to refrain from any legal action against us regarding your Contributions.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">GUIDELINES FOR REVIEWS</div>
				We may provide you with areas on the Site to leave reviews or ratings. <br/> When posting a review, you must comply with the following criteria: 
				<ul className="w-full mt-3 px-5 md:px-10 list-decimal">
					<li className="w-full my-2">You should have firsthand experience with the person/entity being reviewed. </li>
					<li className="w-full my-2">Your reviews should not contain offensive profanity, or abusive, racist, offensive, or hate language. </li>
					<li className="w-full my-2">Your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability. </li>
					<li className="w-full my-2">Your reviews should not contain references to illegal activity. </li>
					<li className="w-full my-2">You should not be affiliated with competitors if posting negative reviews. </li>
					<li className="w-full my-2">You should not make any conclusions as to the legality of conduct. </li>
					<li className="w-full my-2">You may not post any false or misleading statements. </li>
					<li className="w-full my-2">You may not organize a campaign encouraging others to post reviews, whether positive or negative. </li>
				</ul>
				We may accept, reject, or remove reviews at our sole discretion. <br/> We have absolutely no obligation to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate. <br/> Reviews are not endorsed by us and do not necessarily represent our opinions or the views of any of our affiliates or partners. <br/> We do not assume liability for any review or any claims, liabilities, or losses resulting from any review. <br/> By posting a review, you hereby grant to us a perpetual, non-exclusive, worldwide, royalty-free, fully-paid, assignable, and sublicensable right and license to reproduce, modify, translate, transmit by any means, display, perform, and/or distribute all content relating to reviews.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">SUBMISSIONS</div>
				You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole property. <br/> We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you. <br/> You hereby waive all moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions. <br/> You agree there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">THIRD-PARTY WEBSITES AND CONTENT</div>
				The Site may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). <br/> Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on, available through, or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. <br/> Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. <br/> If you decide to leave the Site and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Terms of Use no longer govern. <br/> You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Site or relating to any applications you use or install from the Site. <br/> Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever for such purchases which are exclusively between you and the applicable third party. <br/> You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us harmless from any harm caused by your purchase of such products or services. <br/> Additionally, you shall hold us harmless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">U.S. GOVERNMENT RIGHTS</div>
				Our services are “commercial items” as defined in Federal Acquisition Regulation (“FAR”) 2.101. <br/> If our services are acquired by or on behalf of any agency not within the Department of Defense (“DOD”), our services are subject to the terms of these Terms of Use by FAR 12.212 (for computer software) and FAR 12.211 (for technical data). <br/> If our services are acquired by or on behalf of any agency within the Department of Defense, our services are subject to the terms of these Terms of Use by Defense Federal Acquisition Regulation (“DFARS”) 227.7202‑3. <br/> In addition, DFARS 252.227‑7015 applies to technical data acquired by the DOD. <br/> This U.S. Government Rights clause is instead of, and supersedes, any other FAR, DFARS, or other clause or provision that addresses government rights in computer software or technical data under these Terms of Use.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">SITE MANAGEMENT</div>
				We reserve the right, but not the obligation, to: 
				<ul className="w-full mt-3 px-5 md:px-10 list-decimal">
					<li className="w-full my-2">Monitor the Site for violations of these Terms of Use.</li>
					<li className="w-full my-2">Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities.</li>
					<li className="w-full my-2">In our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof.</li>
					<li className="w-full my-2">In our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems.</li>
					<li className="w-full my-2">Otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.</li>
				</ul>

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">PRIVACY POLICY</div>
				We care about data privacy and security. <br/> Please review our Privacy Policy:
				https://insperr.com/privacy
				<br/> By using the Site, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use. <br/> Please be advised the Site is hosted in the United States. <br/> If you access the Site from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Site, you are transferring your data to the United States, and you agree to have your data transferred to and processed in the United States. Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. <br/> Therefore, by the U.S. Children’s Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Site as quickly as is reasonably practical.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">TERM AND TERMINATION</div>
				These terms of use shall remain in full force and effect while you use the site. <br/> without limiting any other provision of these terms of use, we reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the site (including blocking certain IP addresses), to any person for any reason or no reason, including without limitation for breach of any representation, warranty, or covenant contained in these terms of use or of any applicable law or regulation. <br/> we may terminate your use or participation in the site or delete your account and any content or information that you posted at any time, without warning, in our sole discretion. <br/> 
				If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. <br/> In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">MODIFICATIONS AND INTERRUPTIONS</div>
				We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. <br/> However, we have no obligation to update any information on our Site. <br/> We also reserve the right to modify or discontinue all or part of the Site without notice at any time. <br/> We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site. <br/>  
				We cannot guarantee the Site will be available at all times. <br/> We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. <br/> We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you. <br/> You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site. <br/> Nothing in these Terms of Use will be construed to obligate us to maintain and support the Site or to supply any corrections, updates, or releases in connection therewith.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">GOVERNING LAW</div>
				These conditions are governed by and interpreted following the laws of the United Kingdom, and the use of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded. <br/> If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law of your country of residence. Insperr and yourself both agree to submit to the non-exclusive jurisdiction of the courts of__________, which means that you may make a claim to defend your consumer protection rights in regards to these Conditions of Use in the United Kingdom, or in the EU country in which you reside.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">DISPUTE RESOLUTION</div>
				<span className="font-somibold">Informal Negotiations: </span> To expedite resolution and control the cost of any dispute, controversy or claim related to these Terms of Use (each "Dispute" and collectively, the “Disputes”) brought by either you or us (individually, a “Party” and collectively, the “Parties”), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30)days before initiating the arbitration. <br/> Such informal negotiations commence upon written notice from one Party to the other Party.
				<span className="font-somibold">Binding Arbitration: </span> Any dispute arising from the relationships between the Parties to this contract shall be determined by one arbitrator who will be chosen by the Arbitration and Internal Rules of the European Court of Arbitration being part of the European Centre of Arbitration having its seat in Strasbourg, and which are in force at the time the application for arbitration is filed, and of which adoption of this clause constitutes acceptance. <br/> The seat of arbitration shall be the United Kingdom. <br/> The language of the proceedings shall be English. <br/> Applicable rules of substantive law shall be the law of the United Kingdom.
				<span className="font-somibold">Restrictions: </span> The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. <br/> To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class-action procedures, and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
				<span className="font-somibold">Exceptions to Informal Negotiations and Arbitration: </span> The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations and binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. <br/> If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">CORRECTIONS</div>
				There may be information on the Site that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. <br/> We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">DISCLAIMER</div>
				The site is provided on an as-is and as-available basis. <br/> you agree that your use of the site and our services will be at your sole risk. <br/> to the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the site and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. <br/> we make no warranties or representations about the accuracy or completeness of the site’s content or the content of any websites linked to the site and we will assume no liability or responsibility for any (1) errors, mistakes, or inaccuracies of content and materials, (2) personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the site, (3) any unauthorized access to or use of our secure servers and/or any personal information and/or financial information stored therein, (4) any interruption or cessation of transmission to or from the site, (5) any bugs, viruses, trojan horses, or the like which may be transmitted to or through the site by any third party, and/or (6) any errors or omissions in any content and materials or for any loss or damage of any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via the site. <br/> we do not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the site, any hyperlinked website, or any website or mobile application featured in any banner or other advertising, and we will not be a party to or in any way be responsible for monitoring any transaction between you and any third-party providers of products or services. <br/> as with the purchase of a product or service through any medium or in any environment, you should use your best judgment and exercise caution where appropriate.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">LIMITATIONS OF LIABILITY</div>
				In the event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages. <br/> notwithstanding anything to the contrary contained herein, our liability to you for any cause whatsoever and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us during the six (6)month period before any cause of action arising. <br/> certain our state laws and international laws do not allow limitations on implied warranties or the exclusion or limitation of certain damages. <br/> if these laws apply to you, some or all of the above disclaimers or limitations may not apply to you, and you may have additional rights.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">INDEMNIFICATION</div>
				You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of:
				<ul className="w-full mt-3 px-5 md:px-10 list-decimal">
					<li className="w-full my-2">Use of the Site.</li>
					<li className="w-full my-2">Breach of these Terms of Use.</li>
					<li className="w-full my-2">Any breach of your representations and warranties outlined in these Terms of Use.</li>
					<li className="w-full my-2">Your violation of the rights of a third party, including but not limited to intellectual property rights.</li>
					<li className="w-full my-2">Any overt harmful act toward any other user of the Site with whom you connected via the Site. <br/> Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. <br/> We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.</li>
				</ul>

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">USER DATA</div>
				We will maintain certain data that you transmit to the Site to manage the performance of the Site, as well as data relating to your use of the Site. <br/> Although we perform routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. <br/> You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</div>
				Visiting the site, sending us emails, and completing online forms constitute electronic communications. <br/> you consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the site, satisfy any legal requirement that such communication is in writing. <br/> you hereby agree to the use of electronic signatures, contracts, orders, and other records, and the electronic delivery of notices, policies, and records of transactions initiated or completed by us or via the site. <br/> you hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.

				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">CALIFORNIA USERS AND RESIDENTS</div>
				If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
				
				<div className="mt-6 w-full mb-1 text-lg md:text-xl font-semibold">MISCELLANEOUS</div>
				These Terms of Use and any policies or operating rules posted by us on the Site or concerning the Site constitute the entire agreement and understanding between you and us. <br/> Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. <br/> These Terms of Use operate to the fullest extent permissible by law. <br/> We may assign any or all of our rights and obligations to others at any time. <br/> We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. <br/> If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. <br/> There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Site. <br/> You agree that these Terms of Use will not be construed against us by having drafted them. <br/> You hereby waive any defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.
			</div>
		</ContentContainer>
	</>
}


TermsOfUse.getLayout = (page) => <UnauthenticatedLayout title="Insperr – Terms & Conditions">{page}</UnauthenticatedLayout>

export default TermsOfUse