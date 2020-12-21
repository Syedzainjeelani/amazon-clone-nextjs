import React from 'react'
import styles from '../styles/Subtotal.module.css'
import CurrencyFormat from 'react-currency-format'
import { getCartTotal, useStateContext } from '../StateProvider'
import Link from 'next/link';

function Subtotal() {
    const [{ cart, user }] = useStateContext();

    console.log("User>>", user, "isnull", !user)

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
            <Link href="/payment" >
                <button disabled={!user || cart.length === 0} >Proceed To Checkout
                <div id="splash" className={styles.subtotal__splash}></div>
                </button>
            </Link>
            {!user || cart.length === 0 && <p className={styles.subtotal__caption}>{cart.length === 0 ? "Please Add some items to the Cart" : "Please Sign in First"}</p>}
        </div>
    )
}

export default Subtotal
