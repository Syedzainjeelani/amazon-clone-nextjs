import React, { useEffect } from 'react'
import useSWR from 'swr';
import { fetchGetJSON } from '../utils/api-helpers';
import { useRouter } from 'next/router';
import { useStateContext } from '../StateProvider';



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
        emptyCart();
        return () => {
            ""
        }
    }, [])


    console.log(data)
    return (
        <div>
            <h2>Checkout Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
            <h3>CheckoutSession response:</h3>
            {/* <PrintObject content={data ?? 'loading...'} /> */}
            {/* <p>{{data} ?? 'loading...'}</p> */}

        </div>
    )
}

export default checkoutResult
