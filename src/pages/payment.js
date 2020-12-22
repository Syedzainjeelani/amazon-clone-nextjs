import React from 'react'
import styles from '../styles/Payment.module.css'
import { useStateContext } from '../StateProvider'
import CheckoutProduct from '../components/CheckoutProduct'

function payment() {
    const [{ cart },] = useStateContext()


    return (
        <div className={styles.payment}>

            <div className={styles.payment__address}>
                <p>Add Billing Address</p>
                <form action="">
                    <input type="text" placeholder="Fullname" />
                    <textarea type="text" placeholder="Address" rows="2" maxLength="50px" />
                    <input type="text" placeholder="City" />
                    <input type="number" placeholder="Postal Code" />
                    <input type="text" placeholder="State" />
                    <input type="text" placeholder="Country" />
                </form>
            </div>

            <div className={styles.payment__products}>
                <h3>Checkout (Items 0)</h3>

                {
                    cart.map(item => {
                        return <CheckoutProduct id={item.id}
                            title={item.title}
                            desc={item.desc}
                            price={item.price}
                            image={item.image}
                            rating={item.rating}
                            hidden={true}

                        />
                    })
                }
            </div>

            <div className={styles.payment__card}>

            </div>
        </div>
    )
}

export default payment
