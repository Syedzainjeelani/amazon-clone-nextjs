import React, { useEffect } from 'react'
import useSWR from 'swr';
import { fetchGetJSON } from '../utils/api-helpers';
import { useRouter } from 'next/router';
import { useStateContext } from '../StateProvider';
import logoStyle from '../styles/Login.module.css'
import Link from 'next/link'
import styles from '../styles/CheckoutResult.module.css'


function checkoutResult() {
    const router = useRouter();
    const [{ cart }, dispatch] = useStateContext();


    // Fetch CheckoutSession from static page via
    // https://nextjs.org/docs/basic-features/data-fetching#static-generation
    const { data, error } = useSWR(
        router.query.session_id
            ? `/api/checkout_sessions/${router.query.session_id}`
            : null,
        fetchGetJSON
    );

    if (error) return <div>failed to load</div>;

    const emptyCart = () => {
        dispatch({
            type: "EMPTY_CART",
        })
    }

    useEffect(() => {
        //Add cart items to the firestore DB before emptying


        //...............
        //Empty cart after successfull checkout
        emptyCart();

        //Redirecting to the Orders page in 5 seconds
        setInterval(() => (router.push('/orders')), 5000)
        return () => {
            ""
        }
    }, [])



    console.log(data)
    return (
        <div className={styles.checkoutResult}>

            <div >
                <Link href='/'>
                    <img className={logoStyle.login__logo} src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" />
                </Link>
            </div>

            <div className={styles.checkoutResult__status}>
                <h1>Checkout Status: {data?.payment_intent?.status ?? 'loading...'}</h1>
                <h2>Thank you for the purchase</h2>
            </div>

            <div className={styles.checkoutResult__orders}>
                <h5>Redirecting to Orders & Returns...</h5>
            </div>

        </div>
    )
}

export default checkoutResult
