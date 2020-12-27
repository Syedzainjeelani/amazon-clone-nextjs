import React, { useState } from 'react'
import styles from '../styles/Product.module.css'
import { useStateContext } from '../StateProvider'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { db } from "../firebase"


const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        position: "absolute",
        top: '80px',
        left: '30px',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    image: {
        width: '100px',
        objectFit: 'cover',
        marginRight: '10px'

    },
}));


function Product({ id, title, price, rating, image }) {
    const [{ cart, user }, dispatch] = useStateContext()
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 500);
    }

    const addToCart = () => {
        handleOpen();

        //Adding cart items to firestore DB too
        let product = {
            id: id,
            title: title,
            price: price,
            rating: rating,
            image: image,
        }

        db.collection("users")
            .doc(user?.email)
            .collection("cart")
            .doc(user?.uid)
            .set({
                cartItems: [...cart, product]
            })
            .then((res) => {
                console.log("Firestore add to cart: ", res)
            })
            .catch(function (error) {
                console.error("Error adding cart: ", error);
            });

        //Adding to the data layer
        dispatch({
            type: "ADD_TO_CART",
            item: product,
        })
    }

    const body = (
        <div className={classes.paper} >
            <img className={classes.image} src={image} alt="product_img" />
            <div className={styles.product__info}>
                <p>{title}</p>
                <p className={styles.product__price}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </div>
        </div>
    );


    const handleClose = () => {
        setOpen(false);
    };




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
                        .fill().map((item, ind) => <p key={ind}>🌟</p>)}
                </div>
            </div>

            <img src={image} alt="product_img" />
            <Modal
                open={open}
                onClose={handleClose}
                disableEnforceFocus
                disableScrollLock
                disableAutoFocus
                aria-disabled
                hideBackdrop={true}
            >
                {body}
            </Modal>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Product

