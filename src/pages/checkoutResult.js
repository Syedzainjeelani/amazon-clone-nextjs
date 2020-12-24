import React, { useEffect } from 'react'
import useSWR from 'swr';
import { fetchGetJSON } from '../utils/api-helpers';
import { useRouter } from 'next/router';
import { useStateContext } from '../StateProvider';
import logoStyle from '../styles/Login.module.css'
import Link from 'next/link'


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

        //................
        emptyCart();
        return () => {
            ""
        }
    }, [])


    console.log(data)
    return (
        <div className={checkoutResult}>

            <div >
                <Link href='/'>
                    <img className={logoStyle.login__logo} src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" />
                </Link>
            </div>

            <div>
                <h2>Checkout Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
                <h3>Thank you for the purchase</h3>
            </div>

            <div>
                <Link href='/orders'>
                    <h5>You can check your orders history here.</h5>
                </Link>
            </div>

        </div>
    )
}

export default checkoutResult
