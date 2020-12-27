import { useReducer, useContext, createContext } from 'react'
import { db } from './firebase'
// Prepares the datelayer
const StateContext = createContext()
// const DispatchContext = createContext()


export const initialState = {
    cart: [],
    user: null,
    ordersStored: false,
};

// Selector (reducer functions should be inside the state provider file)
export const getCartTotal = (cart) =>
    cart?.reduce((amount, item) => item.price + amount, 0);


const updateCart = (user, cart) => {
    //update the cart when it changes in firestore
    db.collection("users")
        .doc(user?.email)
        .collection("cart")
        .doc(user?.uid)
        .update({
            cartItems: [...cart]
        })
        .then((res) => {

            console.log("Firestore updated cart: ", cart)
        })
        .catch(function (error) {
            console.error("Error adding cart: ", error);
        });
}

const reducer = (state, action) => {
    // console.log(action);
    // console.log("Adding to Data layer");
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,  // with the current old state
                cart: [...state.cart, action.item],  //with old cart items add new item
            }
        case "REMOVE_FROM_CART":
            const index = state.cart.findIndex((item) => (item.id === action.id))
            let newCart = [...state.cart]
            if (index >= 0) {
                newCart.splice(index, 1);
            } else {
                console.warn(`Can't remove product {id: ${action.id} not found!}`)
            }

            //update firestore db 
            updateCart(state.user, newCart)

            return {
                ...state,  // with the current old OTHER state
                // cart: state.cart.filter((item, ind) => (item.id != action.id)),  //with old cart items add new item
                cart: newCart,

            }
        case "EMPTY_CART":
            return {
                ...state,
                cart: [],
            }
        case "ADD_USER":
            return {
                ...state,
                user: action.user,
            }
        case "ORDER_STORED":
            return {
                ...state,
                ordersStored: action.stored,
            }

        default:
            return state;
    }
};

//Wrap our app (children) and provide the Data Layer down the tree line
export const StateProvider = ({ children }) => {
    return <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>

}


//Pulls information from the datalayer
export const useStateContext = () => useContext(StateContext)
// export const useDispatchContext = () => useContext(DispatchContext)





// const [state, dispatch] = useReducer(reducer, initialState)
// return <DispatchContext.Provider value={dispatch}>
    //     <StateContext.Provider value={state}>
    //         {children}
    //     </StateContext.Provider>
    // </DispatchContext.Provider>

