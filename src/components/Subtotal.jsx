import React from 'react'
import styles from '../../styles/Subtotal.module.css'
import CurrencyFormat from 'react-currency-format'
import { getCartTotal } from '../StateProvider'

function Subtotal() {
    return (

        <div className={styles.subtotal}>
            <CurrencyFormat
                renderText={(value) => (<>
                    <p>
                        Subtotal (0 items): <strong>0</strong>
                    </p>
                    <small className={styles.subtotal__gift}>
                        <input type="checkbox" /> This order contains a gift
                 </small>
                </>)

                }
                decialScale={2}
                value={0}
                displayType={'text'}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button>Proceed To Checkout</button>
        </div>
    )
}

export default Subtotal
