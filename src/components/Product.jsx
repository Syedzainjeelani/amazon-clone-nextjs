import React from 'react'
import styles from '../styles/Product.module.css'
import { useStateContext } from '../StateProvider'

function Product({ id, title, price, rating, image }) {
    const [{ cart }, dispatch] = useStateContext()

    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image,
            }
        })
    }

    return (
        <div className={styles.product}>

            <div className={styles.product__info}>
                <p>{title}</p>
                <p className={styles.product__price}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className={styles.product__rating}>
                    {Array(rating)
                        .fill().map((item, ind) => <p>🌟</p>)}
                </div>
            </div>

            <img src={image} alt="product_img" />

            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Product

