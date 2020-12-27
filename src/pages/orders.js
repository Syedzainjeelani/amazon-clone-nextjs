import React, { useEffect, useState } from 'react'
import logoStyle from '../styles/Login.module.css'
import styles from '../styles/Orders.module.css'
import Link from 'next/link'
import { auth, db } from "../firebase"
import { useStateContext } from "../StateProvider"
import CircularProgress from '@material-ui/core/CircularProgress';
import CurrencyFormat from 'react-currency-format'
import CheckoutProduct from '../components/CheckoutProduct'

function orders() {
    const [{ user }, dispatch] = useStateContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        //Add user if found <nul </null>
        if (!user) {
            auth.onAuthStateChanged((authUser) => {
                // console.log("User...", user)

                if (authUser) {
                    // if user is signed in then store the user inside the data layer (the context api)
                    dispatch({
                        type: "ADD_USER",
                        user: authUser,
                    })
                } else {
                    dispatch({
                        type: "ADD_USER",
                        user: null,
                    })
                }
            })
        }


        if (orders.length === 0) {

            try {
                db.collection("users")
                    .doc(user?.email)
                    .collection("orders")
                    .orderBy("timeStamp", "desc")
                    .get().then((querySnapshot) => {
                        var ordersList = querySnapshot.docs.map((item) => {

                            return {
                                id: item.id,
                                ...item.data(),
                            }
                        })
                        console.log("Orders Returned: ", ordersList)
                        setOrders(ordersList)

                    })
                    .then((res) => {
                        //Empty cart from firestore too after successfull checkout
                        console.log("Firebase db response");
                        setLoading(false);

                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                        alert(error)
                    });
            } catch (error) {
                alert(error)
            }
        }

    }, [user])

    return (
        <div className={styles.orders}>


            <div >
                <Link href='/'>
                    <img className={logoStyle.login__logo} src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" />
                </Link>
            </div>

            <h1>Orders & Returns</h1>
            <div className={styles.orders__list}>
                {loading && <div className={styles.orders__loading}><CircularProgress /></div>}
                {((!loading) && (orders.length === 0)) && <div className={styles.orders__loading}><p>There are no orders yet!</p></div>}
                {!loading && orders?.map((order, ind) => {
                    return (
                        <div key={ind} className={styles.orders__order}>
                            <div className={styles.orders__orderId}>
                                <h3>Order Id </h3>
                                <p>{`: ${order.id}`}</p>
                            </div>
                            <CurrencyFormat
                                renderText={(value) => (<div className={styles.orders__orderAmount}>
                                    <h3>Total ({order.data.length} items) </h3>
                                    <p>
                                        <strong>{`: ${value}`}</strong>
                                    </p>
                                </div>)

                                }
                                decimalScale={2}
                                value={order.amount}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            {
                                order.data.map((cart, ind) => {
                                    return (<CheckoutProduct
                                        key={ind}
                                        id={cart.id}
                                        title={cart.title}
                                        price={cart.price}
                                        rating={cart.rating}
                                        image={cart.image}
                                        hidden={true}
                                    />)
                                })
                            }

                        </div>
                    )
                })

                }
            </div>
        </div>
    )
}

export default orders
