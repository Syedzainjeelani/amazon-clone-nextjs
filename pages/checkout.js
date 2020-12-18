import React from 'react'
import styles from '../styles/Checkout.module.css'
import Subtotal from '../src/components/Subtotal'
import CheckoutProduct from '../src/components/CheckoutProduct'
import { useStateContext } from '../src/StateProvider'

function checkout() {
    const [{ cart, user }] = useStateContext();
    return (
        <div className={styles.checkout}>

            <div className={styles.checkout__left}>

                <div>
                    {/* <h2 className={styles.checkout__title}> </h2> */}
                    <h2 className={styles.checkout__title}>
                        Hello, {user?.email} <br />
                        {/* (?) = (like a try catch block) optional chaining helps with errs until user is loaded */}
                    Your Shoping Cart {cart.length === 0 && 'is Empty'}
                    </h2>

                </div>

                {cart.map((item, ind) => (
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                        image={item.image}
                    />
                ))}


            </div>


            <div className={styles.checkout__right}>
                <Subtotal />
            </div>


        </div>
    )
}

export default checkout
