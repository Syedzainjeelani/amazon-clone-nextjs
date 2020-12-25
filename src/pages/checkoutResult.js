import React, { useEffect } from 'react'
import useSWR from 'swr';
import { fetchGetJSON } from '../utils/api-helpers';
import { useRouter } from 'next/router';
import { getCartTotal, useStateContext } from '../StateProvider';
import logoStyle from '../styles/Login.module.css'
import Link from 'next/link'
import styles from '../styles/CheckoutResult.module.css'
import { db, auth } from '../firebase'

function checkoutResult() {
    const router = useRouter();
    const [{ cart, user }, dispatch] = useStateContext();


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
        //Add user if found <nul </null>
        // auth.onAuthStateChanged((authUser) => {
        //     console.log("User...", user)

        //     if (authUser) {
        //         // if user is signed in then store the user inside the data layer (the context api)
        //         dispatch({
        //             type: "ADD_USER",
        //             user: authUser,
        //         })
        //     } else {
        //         dispatch({
        //             type: "ADD_USER",
        //             user: null,
        //         })
        //     }
        // })


        //Add cart items to the firestore DB before emptying
        console.log('Db.collection... called')
        console.log("User... ", user)
        console.log("Data>>> ", data)

        db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(data?.id)
            .set({
                id: data?.payment_intent,
                amount: getCartTotal(cart),
                data: cart,
            })
            .then((res) => {
                //Empty cart after successfull checkout
                emptyCart();
                console.log("Firebase db res: ", res)
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

        console.log("Db.collection...ended")
        //...............


        //Redirecting to the Orders page in 5 seconds
        // if (router.pathname.startsWith("/checkoutResult")) {
        setTimeout(() => {
            router.push('/orders')
        }, 5000)
        // }
    }, [data])



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
