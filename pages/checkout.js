import React from 'react'
import styles from '../styles/Checkout.module.css'
import Subtotal from '../src/components/Subtotal'

function checkout() {
    return (
        <div className={styles.checkout}>

            <div className={styles.checkout__left}>

                <div>
                    <h2 className={styles.checkout__title}>Your Shoping Cart</h2>

                </div>



            </div>


            <div className={styles.checkout__right}>
                <Subtotal />
            </div>




        </div>
    )
}

export default checkout
