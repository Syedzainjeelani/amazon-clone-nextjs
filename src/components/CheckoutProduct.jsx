import React, { useEffect } from 'react'
import styles from '../styles/CheckoutProduct.module.css'
import { useStateContext } from '../StateProvider'
import { db } from "../firebase"

function CheckoutProduct({ id, title, price, rating, image, hidden }) {
    const [{ user, cart }, dispatch] = useStateContext();

    const removeFromCart = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id,
        })

    }

    return (
        <div className={styles.checkoutProduct}>
            <img className={styles.checkoutProduct__image} src={image} alt="product_img" />
            <div className={styles.checkoutProduct__info}>
                <p className={styles.checkoutProduct__title}>{title}</p>
                <p className={styles.checkoutProduct__price}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className={styles.checkoutProduct__rating}>
                    {Array(rating)
                        .fill().map((item, ind) => <p key={ind}>🌟</p>)}
                </div>

                {!hidden && <button onClick={removeFromCart}>Remove From Cart</button>}
            </div>
        </div>
    )
}

export default CheckoutProduct
