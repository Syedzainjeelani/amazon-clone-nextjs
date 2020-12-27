export const CURRENCY = 'usd'
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0
export const MAX_AMOUNT = 5000.0
export const AMOUNT_STEP = 5.0
import { db } from '../firebase'
import { products } from './data/products'


export default function storeInventory() {


    // db.collection("inventory")
    //     .doc("inventory_products")
    //     .set({
    //         "products": products
    //     })
    //     .then((res) => {
    //         console.log("Firestore Added inventory: ")
    //     })
    //     .catch(function (error) {
    //         console.error("Error Adding to inventory: ", error);
    //     });
}