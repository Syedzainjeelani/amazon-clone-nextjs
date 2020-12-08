import Header from '../src/components/Header'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Amazon Clone</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

      </Head>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
