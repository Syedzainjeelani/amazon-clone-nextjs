import React from 'react'
import logoStyle from '../styles/Login.module.css'
import styles from '../styles/Orders.module.css'
import Link from 'next/link'

function orders() {
    return (
        <div className={styles.orders}>

            {/* <div className={styles.orders__header}> */}

            <div >
                <Link href='/'>
                    <img className={logoStyle.login__logo} src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" />
                </Link>
            </div>

            <h1>Orders & Returns</h1>
            {/* </div> */}
            <div className={styles.orders__list}>
                <p>Orders. Fetch from firestore....</p>
            </div>
        </div>
    )
}

export default orders
