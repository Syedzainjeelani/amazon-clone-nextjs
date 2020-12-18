import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import { auth } from '../src/firebase'
import Link from 'next/link'




function login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    const signin = (e) => {
        //use firebases authentication...

        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth)
                if (auth) {
                    router.push('/');
                }
            })
            .catch((err) => {
                if (email.length === 0 || password.length === 0) {
                    alert(`Please Enter Email & Pass to Sign In`)
                } else {
                    alert(`${err.message}`)
                }
            })

    }

    const register = (e) => {
        //just simply regester to firebase 

        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth)
                if (auth) {
                    router.push('/')
                }
            })
            .catch((err) => {
                if (email.length === 0 || password.length === 0) {
                    alert(`Please Enter Email & Pass to create account`)
                } else {
                    alert(`${err.message}`)
                }
            })

    }


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
                    <input type="email" value={email} onChange={(e) => (setEmail(e.target.value))} />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={(e) => (setPassword(e.target.value))} />
                    <button type="submit" onClick={signin}>Sign In</button>
                </form>
                <p>By signing-in you agree to the Amazon clone conditions of use and sale. Please see our Privacy policy, our Cookies and Ads usage legal policies.</p>

                <button onClick={register}>Create Amazon Clone Account</button>
            </div>

            <p className={styles.login__copyright}>Created By <a href="https://syedzainjeelani.github.io/cv/">Syed Zain Jeelani</a> </p>
        </div>
    )
}

export default login
