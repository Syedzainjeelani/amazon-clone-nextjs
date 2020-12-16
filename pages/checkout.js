import React from 'react'
import styles from '../styles/Checkout.module.css'
import Subtotal from '../src/components/Subtotal'
import CheckoutProduct from '../src/components/CheckoutProduct'

function checkout() {
    return (
        <div className={styles.checkout}>

            <div className={styles.checkout__left}>

                <div>
                    <h2 className={styles.checkout__title}>Your Shoping Cart</h2>
                </div>

                <CheckoutProduct
                    id="4903850"
                    title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                    price={199.99}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"

                />
                <CheckoutProduct
                    id="12321341"
                    title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
                    price={11.96}
                    rating={5}
                    image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"

                />
                {/* <CheckoutProduct /> */}


            </div>


            <div className={styles.checkout__right}>
                <Subtotal />
            </div>




        </div>
    )
}

export default checkout
