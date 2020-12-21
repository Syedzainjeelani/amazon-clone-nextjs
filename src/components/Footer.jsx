import React from 'react'
import styles from '../styles/Footer.module.css'

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_row}>
                <div className={styles.footer__col}>
                    <h3>Get to Know Us</h3>
                    <h4>Careers</h4>
                    <h4>Blog</h4>
                    <h4>About Amazon</h4>
                    <h4>Sustainability</h4>
                    <h4>Invester Relations</h4>
                    <h4>Amazon Tours</h4>
                </div>
                <div className={styles.footer__col}>
                    <h3>Make Money with Us</h3>
                    <h4>sell products on Amazon</h4>
                    <h4>Sell apps on Amazon</h4>
                    <h4>Become an Affiliate</h4>
                    <h4>Advertise Your Products</h4>
                    <h4>Self-Publish with Us</h4>
                    <h4>Host an Amazon Hub</h4>
                </div>
                <div className={styles.footer__col}>
                    <h3>Amazon Payment Products</h3>
                    <h4>Amazon Business Card</h4>
                    <h4>Shop with Points</h4>
                    <h4>Reload Your Balance</h4>
                    <h4>Amazon Currency Converter</h4>
                </div>
                <div className={styles.footer__col}>
                    <h3>Let Us Help You</h3>
                    <h4>Amazon and COVID-19</h4>
                    <h4>Your Account</h4>
                    <h4>Your Orders</h4>
                    <h4>Shipping Rates & Policies</h4>
                    <h4>Returns & Replacements</h4>
                    <h4>Manage Your Content and Devices</h4>
                    <h4>Amazon Assistant</h4>
                    <h4>Help</h4>
                </div>
            </div>

            <hr className={styles.footer__divider} />
            <div className={styles.footer__copyright}>
                <p>Created By <a href="https://syedzainjeelani.github.io/cv/">Syed Zain Jeelani</a> </p>
            </div>
        </div>
    )
}

export default Footer
