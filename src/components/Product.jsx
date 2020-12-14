import React from 'react'
import styles from '../../styles/Product.module.css'

function Product({ id, title, price, rating, image }) {
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

            <button>Add to Cart</button>
        </div>
    )
}

export default Product

