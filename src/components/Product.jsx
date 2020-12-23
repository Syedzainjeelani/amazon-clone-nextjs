import React, { useState } from 'react'
import styles from '../styles/Product.module.css'
import { useStateContext } from '../StateProvider'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';



function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const right = 50 + rand();

    return {
        // top: `${top}%`,
        // right: `${right}%`,
        top: '80px',
        left: '30px',
        // right: '30px',
        // transform: `translate(-${top}%, -${right}%)`,
    };
}


const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        position: "relative",
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
    modelPosition: {
        position: 'absolute',
        top: '40px',
        right: '50px',
    }
}));


function Product({ id, title, price, rating, image }) {
    const [{ cart }, dispatch] = useStateContext()
    const [open, setOpen] = useState()
    const classes = useStyles()
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 500);
    }

    const addToCart = () => {
        handleOpen();

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

    const body = (
        <div style={modalStyle} className={classes.paper} >
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
                        .fill().map((item, ind) => <p>🌟</p>)}
                </div>
            </div>

            <img src={image} alt="product_img" />
            <Modal
                position={classes.modelPosition}
                open={open}
                onClose={handleClose}
                // aria-labelledby="simple-modal-title"
                // aria-describedby="simple-modal-description"
                disableEnforceFocus
                disableScrollLock
                disableAutoFocus
                aria-disabled
                disableBackdropClick
                hideBackdrop={true}
            >
                {body}
            </Modal>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Product

