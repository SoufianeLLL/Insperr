// import Script from 'next/script'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

	render() {
		return (
			<Html dir="ltr" lang="en">
				<Head>
					<meta charSet="UTF-8" />
					{/* <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com" /> */}
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
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link href="//fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;400;800&display=swap" rel="stylesheet" />
				</Head>
				<body className="bg-white text-black dark:bg-black dark:text-white">
					<Main />
					{/* <Script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PQ79D8C')` }}></Script> */}
					{/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQ79D8C" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript> */}
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument