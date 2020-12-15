import { useReducer, useContext, createContext } from 'react'

// Prepares the datelayer
const StateContext = createContext()
// const DispatchContext = createContext()


export const initialState = {
    cart: [],
    user: null
};

// Selector
export const getCartTotal = (cart) =>
    cart?.reduce((amount, item) => item.price + amount, 0);


const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,  // with the current old state
                cart: [...state.cart, action.item],  //with old cart items add new item
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

