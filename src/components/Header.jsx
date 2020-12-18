import React, { useEffect } from 'react'
import styles from '../../styles/Header.module.css'
import SearchIcon from '@material-ui/icons/Search';
import FlagIcon from '@material-ui/icons/Flag';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Link from 'next/Link';
import { useStateContext } from '../StateProvider';
import { auth } from '../firebase';

function Header() {
    const [state, dispatch] = useStateContext();

    //just like component did mount (will run every time component is loaded)
    useEffect(() => {
        console.log("Using effect.... in Header")
        auth.onAuthStateChanged((authUser) => {
            console.log("User...", state.user)

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
    }, [])

    const signout = (e) => {
        const user = state.user
        console.log("Sign out", user)
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
                <Link href={!state.user ? '/login' : ""} >

                    <div onClick={signout} className={styles.header__option}>
                        <span className={styles.header__optionLineOne}>Hello, {
                            state.user ? state.user.email.substring(0, 5) : "There"
                        }</span>
                        {<span className={styles.header__optionLineTwo}>Sign {state.user ? ' out' : ` in`}</span>}
                    </div>

                </Link>
                <div className={styles.header__option}>
                    <span className={styles.header__optionLineOne}>Returns</span>
                    <span className={styles.header__optionLineTwo}>& Orders</span>
                </div>

                <Link href='/checkout'>
                    <div className={styles.header__nav, styles.header__option}>
                        <span className={styles.header__optionLineTwo, styles.header__cartCount}>
                            {state.cart.length}
                        </span>
                        <AddShoppingCartIcon />
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default Header
