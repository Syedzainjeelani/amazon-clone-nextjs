import React, { useEffect } from 'react'
import styles from '../styles/Header.module.css'
import SearchIcon from '@material-ui/icons/Search';
import FlagIcon from '@material-ui/icons/Flag';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Link from 'next/link';
import { useStateContext } from '../StateProvider';
import { auth, db } from '../firebase';

function Header() {
    const [{ cart, user }, dispatch] = useStateContext();

    //just like component did mount (will run every time component is loaded)
    useEffect(() => {

        if (!user) {
            //check and add user to data layer
            auth.onAuthStateChanged((authUser) => {

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

        if (cart?.length === 0 && (user)) {
            //load cart from firestore db if empty due to reload
            db.collection("users")
                .doc(user?.email)
                .collection("cart")
                .get().then((querySnapshot) => {
                    var cartList = querySnapshot.docs.map((item) => {
                        //dispatch items from db to data layer
                        item.data()?.cartItems.map((product) => {
                            //only add if cart is empty and only due to reload. 
                            // console.log("ITEM: ", product)
                            dispatch({
                                type: "ADD_TO_CART",
                                item: product,
                            })
                        })
                        return item.data().cartItems
                    })
                    // console.log("Result><><>", cartList)
                })
        }


    }, [user, cart])

    const signout = (e) => {
        // const user = user
        // console.log("Sign out", user)
        if (user) {
            auth.signOut().then((res) => console.log('Res after sign out', res))
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.header__logo}>
                <Link href='/'>
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" />
                </Link>
            </div>

            <div className={styles.header__nav}>
                <LocationOnIcon />
                <div className={styles.header__option} >
                    <span className={styles.header__optionLineOne}>Deliver to</span>
                    <span className={styles.header__optionLineTwo}>Pakistan</span>
                </div>
            </div>

            <div className={styles.header__search}>
                <select className={styles.header__searchSelect} name="All-category-sel" id="-1-sel-header" ><option value="All">All</option></select>
                <input className={styles.header__searchInput} type="text" className={styles.header__searchInput} />
                <SearchIcon className={styles.header__searchIcon} />
            </div>

            <div className={styles.header__nav}>
                <div className={styles.header__option}>
                    <div className={styles.header__langSelect} >
                        <FlagIcon />
                        <select className={styles.header_dropDown} id="-1-language-sel-header" >
                            <option value="lang" index="1">Eng</option>
                        </select>
                    </div>
                </div>
                <Link href={!user ? '/login' : ""} >

                    <div onClick={signout} className={styles.header__option}>
                        <span className={styles.header__optionLineOne}>Hello, {
                            user ? user.email.substring(0, user.email.indexOf('@')) : "There"
                        }</span>
                        {<span className={styles.header__optionLineTwo}>Sign {user ? ' out' : ` in`}</span>}
                    </div>

                </Link>
                <Link href='/orders'>
                    <div className={styles.header__option}>
                        <span className={styles.header__optionLineOne}>Returns</span>
                        <span className={styles.header__optionLineTwo}>& Orders</span>
                    </div>
                </Link>

                <Link href='/checkout'>

                    <div style={cart.length !== 0 ? {
                        padding: "4px",
                        paddingInline: "7px",
                        marginRight: "8px",
                        border: "1px solid gray",
                        borderRadius: "3px",
                        boxShadow: "1px 2px 8px 2px rgb(167, 167, 167)",
                    } : {}}
                        className={styles.header__nav, styles.header__option}>
                        <span className={styles.header__optionLineTwo, styles.header__cartCount}>
                            {cart.length}
                        </span>
                        <AddShoppingCartIcon />
                    </div>

                </Link>
            </div>
        </div >
    )
}

export default Header


