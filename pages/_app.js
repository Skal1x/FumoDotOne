import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <link rel='shortcut icon' href='/favicon.ico' />
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp
