import Link from 'next/link'
import React from 'react'
import styles from '../styles/Login.module.css'


function login() {
    return (
        <div className={styles.login}>
            <div >
                <Link href='/'>
                    <img className={styles.login__logo} src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" />
                </Link>
            </div>

            <div className={styles.login__container}>
                <h1>Sign-in</h1>
                <form action="">
                    <h5>Email</h5>
                    <input type="email" />
                    <h5>Password</h5>
                    <input type="password" />
                </form>
            </div>

        </div>
    )
}

export default login
