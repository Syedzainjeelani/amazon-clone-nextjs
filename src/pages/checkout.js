import React, { forwardRef } from 'react'
import styles from '../styles/Checkout.module.css'
import Subtotal from '../components/Subtotal'
import CheckoutProduct from '../components/CheckoutProduct'
import { useStateContext } from '../StateProvider'
import FlipMove from 'react-flip-move'

function checkout() {
    const [{ cart, user }] = useStateContext();

    const ticketNotVisibleState = {
        transform: "translateX(-100%)",
        opacity: 0.1
    };


    const FunctionalArticle = forwardRef((props, ref) => (
        <div ref={ref}>
            {/* {props.title} */}
            <CheckoutProduct
                id={props.id}
                title={props.title}
                price={props.price}
                rating={props.rating}
                image={props.image}
            />
        </div>
    ));


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
                <FlipMove
                    enterAnimation={{
                        from: ticketNotVisibleState,
                        to: {}
                    }}
                    leaveAnimation={{
                        from: {},
                        to: ticketNotVisibleState,
                    }}
                >
                    {cart.map((item, ind) => (
                        <FunctionalArticle key={item.id + ind} {...item} />
                    ))}
                </FlipMove>


            </div>


            <div className={styles.checkout__right}>
                <Subtotal />
                {/* <Subtotal /> */}
                <div className={styles.checkout_testCard}>
                    <p>Try a stripe checkout Test Card</p>
                    <p>4242 4242 4242 4242</p>
                    <p>Expiry date: any Future date </p>
                    <p>CVC: any 3 digit number </p>
                </div>
            </div>


        </div>
    )
}

export default checkout


{/* <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                image={item.image}
                            /> */}