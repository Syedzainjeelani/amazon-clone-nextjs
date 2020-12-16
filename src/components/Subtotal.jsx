import React from 'react'
import styles from '../../styles/Subtotal.module.css'
import CurrencyFormat from 'react-currency-format'
import { getCartTotal, useStateContext } from '../StateProvider'

function Subtotal() {
    const [{ cart }] = useStateContext();

    //This method is set into provider file its best practice and will be able to access it into different components
    // const getCartTotal = (cart) => {
    //     return cart?.reduce((totalAmount, currItem) => (totalAmount + currItem.price), 0)
    //     // totalAmount works as an accumulator variable and stores prev values or 
    //     // total values, requires initialVal which is 0 here
    // }


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
            <button>Proceed To Checkout</button>
        </div>
    )
}

export default Subtotal
