// import Script from 'next/script'
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
					<link rel="icon" href="/images/favicon/favicon.ico" type="image/x-icon" />
					<link href="/images/favicon/favicon.ico" rel="shortcut icon" />
					<link href="//fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;800&display=swap" rel="stylesheet" />
				</Head>
				<body className="dark:bg-zinc-900">
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