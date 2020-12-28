import Header from '../components/Header'
import Head from 'next/head'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { StateProvider } from '../StateProvider'
import Footer from '../components/Footer'
// import ServiceWorker from  ??

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showHeader = router.pathname === '/login' ||
    router.pathname.startsWith("/checkoutResult") ||
    router.pathname === '/orders'
    ? false : true;
  const showFooter = router.pathname === '/checkout'
    ? false : true;

  return (
    <div>
      <Head>
        <title>Amazon Clone</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <main>
        <StateProvider >
          {showHeader && <Header />}
          <Component {...pageProps} />
          {(showHeader && showFooter) && <Footer />}
        </StateProvider>

      </main>

    </div>
  )
}

export default MyApp

//to work offline use register instread of unregister but learn more about it 
// ServiceWorker.unregister();
