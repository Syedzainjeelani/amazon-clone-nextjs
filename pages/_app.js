import Header from '../src/components/Header'
import Head from 'next/head'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { Router, useRouter } from 'next/router'
import { StateProvider } from '../src/StateProvider'
// import ServiceWorker from  ??

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showHeader = router.pathname === '/login' ? false : true;
  // const [showHeader, setShowHeader] = useState(true)


  // const handleRouteChange = (url) => {
  //   console.log(url)
  //   if (url === '/login') {
  //     setShowHeader(false);
  //   } else {
  //     setShowHeader(true);
  //   }
  // }


  // Router.events.on('routeChangeComplete', handleRouteChange);

  //just like component did mount
  // useEffect(() => {
  //   console.log("USEing effect....")
  //   // Router.events.on('routeChangeComplete', handleRouteChange)
  // }
  //   , [showHeader])

  return (
    <div>
      <Head>
        <title>Amazon Clone</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

      </Head>
      <main>
        <StateProvider >
          {showHeader && <Header />}
          <Component {...pageProps} />
        </StateProvider>

      </main>

    </div>
  )
}

export default MyApp

//to work offline use register instread of unregister but learn more about it 
// ServiceWorker.unregister();
