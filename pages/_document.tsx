import Script from 'next/script'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

	render() {
		return (
			<Html dir="ltr" lang="en">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="environment" content="production" />
					<meta content="IE=edge" httpEquiv="X-UA-Compatible" />
					<meta content="#ffffff" name="theme-color" />
					<meta content="#ffffff" name="msapplication-TileColor" />
					{/* <meta name="google-site-verification" content="kXQ14NGjQLrSEZDtkm5DPIg6btYbYsw4n4_6bgxEhHw" /> */}
					<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
					<link rel="manifest" href="/images/favicon/site.webmanifest" />
					<link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="msapplication-TileColor" content="#2d89ef" />
					<meta name="theme-color" content="#ffffff" />
				</Head>
				<body className="bg-white text-black dark:bg-black dark:text-white">
					<Main />
					<NextScript />
					<Script
						strategy="afterInteractive"
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
					<Script
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
								page_path: window.location.pathname,
								});
							`,
						}}
					/>
				</body>
			</Html>
		)
	}
}

export default MyDocument