import React, { useState } from 'react'
import styles from '../styles/Subtotal.module.css'
import CurrencyFormat from 'react-currency-format'
import { getCartTotal, useStateContext } from '../StateProvider'
import { fetchPostJSON } from '../utils/api-helpers'

import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { loadStripe } from '@stripe/stripe-js';


let stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: "-5%",
        marginLeft: "-10%",
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}));


function Subtotal() {
    const [{ cart, user }, dispatch] = useStateContext();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const classes = useStyles()


    const handleClick = async (event) => {
        event.preventDefault();
        setLoading(true);
        setOpen(true)
        // Get Stripe.js instance
        const stripe = await stripePromise;

        const response = await fetchPostJSON(
            '/api/checkout_sessions/cart',
            cart
        );


        if (response.statusCode === 500) {
            console.error("Response --->", response.message);
            alert(response.message)
            setLoading(false)
            setOpen(false)
            return;
        }
        console.log("Redirect to Checkout....", response.id)
        // setLoading(false)
        // When the customer clicks on the button, redirect them to Checkout.
        await stripe.redirectToCheckout({
            sessionId: response.id,
        }).then((res) => {
            console.log("Result stripe response: ", res)
            alert(res?.error + '/n Please Check Internet connection')
        });

        setLoading(false);
        setOpen(false);

    };



    const body = (
        <div className={classes.paper} >
            <p>Loading Stripe checkout...</p>
            <CircularProgress />
        </div>
    );


    const handleClose = () => {
        setOpen(false);
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
            <button role="link" onClick={handleClick} disabled={!user || cart.length === 0 || loading} >Proceed To Checkout
                <div id="splash" className={styles.subtotal__splash}></div>
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-disabled
            >
                {body}
            </Modal>
            {(!user || (cart.length === 0)) && <p className={styles.subtotal__caption}>{cart.length === 0 && user ? "Please Add some items to the Cart" : "Please Sign in First"}</p>}
        </div>
    )
}

export default Subtotal
