import React, { useState } from 'react'
import styles from '../styles/Subtotal.module.css'
import CurrencyFormat from 'react-currency-format'
import { getCartTotal, useStateContext } from '../StateProvider'
import Link from 'next/link';
import { fetchPostJSON } from '../utils/api-helpers'
import getStripe from '../utils/get-stripejs'

function Subtotal() {
    const [{ cart, user }] = useStateContext();
    const [loading, setLoading] = useState(false);

    console.log("User>>", user, "isnull", !user)


    const handleClick = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Get Stripe.js instance
        const stripe = getStripe;

        const response = await fetchPostJSON(
            '/api/checkout_sessions/cart',
            cart
        );

        if (response.statusCode === 500) {
            console.error("Response --->", response.message);
            return;
        }
        console.log("Redirect to Checkout....", response.id)
        setLoading(false)
        // When the customer clicks on the button, redirect them to Checkout.
        // const result = await stripe.redirectToCheckout({
        //     sessionId: response.id,
        // });
        // if (result.error) {
        //     // If `redirectToCheckout` fails due to a browser or network
        //     // error, display the localized error message to your customer
        //     // using `result.error.message`.
        //     console.log("result error...")
        // }

        // redirectToCheckout({ sessionId: response.id });
    };

    return (

        <div className={styles.subtotal}>
            <CurrencyFormat
                renderText={(value) => (<>
                    <p>
                        Subtotal ({cart.length} items): <strong>{value}</strong>
                    </p>
                    <small className={styles.subtotal__gift}>
                        <input type="checkbox" /> This order contains a gift
                 </small>
                </>)

                }
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={handleClick} disabled={!user || cart.length === 0 || loading} >Proceed To Checkout
                <div id="splash" className={styles.subtotal__splash}></div>
            </button>
            {/* <Link href="/payment" >
                <button disabled={!user || cart.length === 0} >Proceed To Checkout
                <div id="splash" className={styles.subtotal__splash}></div>
                </button>
            </Link> */}
            {(!user || (cart.length === 0)) && <p className={styles.subtotal__caption}>{cart.length === 0 && user ? "Please Add some items to the Cart" : "Please Sign in First"}</p>}
        </div>
    )
}

export default Subtotal
