import React, { useEffect, useState } from 'react'
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
    const [{ cart, user, ordersStored }, dispatch] = useStateContext();
    // const [ordersStored, setOrdersStored] = useState(false);


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


        //empty from firestore too 
        db.collection("users")
            .doc(user?.email)
            .collection("cart")
            .doc(user?.uid)
            .delete().then(() => {
                console.log("Document Cart successfully deleted!")
            }).catch((error) => {
                console.error("Error removing Cart document: ", error);
            });

    }

    const storeOrders = (cartList) => {

        console.log("IS order stored: ", ordersStored)
        if ((data?.payment_intent?.status === "succeeded") && (!ordersStored)) {


            db.collection("users")
                .doc(user?.email)
                .collection("orders")
                .doc(data?.id)
                .set({
                    timeStamp: Date.now(),
                    amount: (data?.payment_intent?.amount / 100),
                    data: cartList,
                })
                .then((res) => {
                    // setOrdersStored(true) //not working can't change state on unmounted component
                    // dispatch({
                    //     type: "ORDER_STORED",
                    //     stored: true,  //false because its already true from cart loading..
                    // })
                    //Empty cart from firestore too after successfull checkout
                    console.log("Firebase db res: ", res)
                    emptyCart();
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });



            //Redirecting to the Orders page in 5 seconds
            setTimeout(() => {
                router.push('/orders')
            }, 1000)

        }

    }


    useEffect(() => {
        //Add user if found <nul </null>
        if (!user) {
            auth.onAuthStateChanged((authUser) => {

                if (authUser) {
                    // if user is signed in then store the user inside the data layer (the context api)
                    dispatch({
                        type: "ADD_USER",
                        user: authUser,
                    })
                } else {
                    dispatch({
                        type: "ADD_USER",
                        user: null,
                    })
                }
            })
        }

        console.log("IS order stored (before loading cart): ", ordersStored)

        //fetch cart from firestore too (data layer is not persistent over page reload)
        if ((cart?.length === 0) && (!ordersStored)) {
            //if cart empty load cart from firestore db if empty due to reload
            db.collection("users")
                .doc(user?.email)
                .collection("cart")
                .get().then((querySnapshot) => {
                    var cartList = querySnapshot.docs.map((item) => {
                        //dispatch items from db to data layer
                        item.data().cartItems.map((product) => {
                            //only add if cart is empty and only due to reload. 

                            dispatch({
                                type: "ADD_TO_CART",
                                item: product,
                            })

                        })
                        return item.data().cartItems
                    })


                    if ((cartList?.length !== 0)) {
                        //finally when cart is loaded then store orders to DB
                        storeOrders(cartList[0])
                        //setting order stored true here other wise cart is loaded twice 
                        dispatch({
                            type: "ORDER_STORED",
                            stored: true,
                        })
                    }

                    console.log("Result from checkouT Res: ", cartList[0])

                })
        }

    }, [data, user, cart])

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
