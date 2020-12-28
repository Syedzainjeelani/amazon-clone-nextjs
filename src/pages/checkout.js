import React, { forwardRef, useEffect } from 'react'
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

    useEffect(() => {
        // effect
        // return () => {
        //     cleanup
        // }
        //load cart from db
        // db.collection("users")
        //         .doc(user?.email)
        //         .collection("cart")
        //         .get().then((querySnapshot) => {
        //             var cartList = querySnapshot.docs.map((item) => {
        //                 //dispatch items from db to data layer
        //                 item.data().cartItems.map((product) => {
        //                     //only add if cart is empty and only due to reload. 

        //                     dispatch({
        //                         type: "ADD_TO_CART",
        //                         item: product,
        //                     })

        //                 })
        //                 return item.data().cartItems
        //             })


        // if ((cartList?.length !== 0)) {
        //     //finally when cart is loaded then store orders to DB
        //     storeOrders(cartList[0])
        //     //setting order stored true here other wise cart is loaded twice 
        //     dispatch({
        //         type: "ORDER_STORED",
        //         stored: true,
        //     })
        // }

        //             console.log("Result from checkouT Res: ", cartList[0])

        //         })


        console.log("cart rerender checkout")
    }, [])

    return (
        <div className={styles.checkout}>

            <div className={styles.checkout__left}>

                <div>
                    {/* <h2 className={styles.checkout__title}> </h2> */}
                    <h2 className={styles.checkout__title}>
                        Hello, {user?.email} <br />
                        {/* (?) = (like a try catch block) optional chaining helps with errs until user is loaded */}
                    Your Shoping Cart {cart?.length === 0 && 'is Empty'}
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
                    {cart?.map((item, ind) => (
                        <FunctionalArticle key={ind} {...item} />
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