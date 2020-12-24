import { NextApiRequest, NextApiResponse } from 'next';

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
import { validateCartItems } from 'use-shopping-cart/src/serverUtil';
import inventory from '../../../config/data/products.json';
import { formatAmountForStripe } from '../../../utils/stripe-helpers'

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // https://github.com/stripe/stripe-node#configuration
    // apiVersion: '2020-03-02',
});


const cartToLineItems = (cartItems) => {
    // [
    //     {
    //       price_data: {
    //         currency: 'usd',
    //         product_data: {
    //           name: 'T-shirt',
    //         },
    //         unit_amount: 2000,
    //       },
    //       quantity: 1,
    //     },
    //   ]
    return cartItems.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                },
                unit_amount: formatAmountForStripe(item.price, "usd"),
            },
            quantity: 1,
        }
    })
}

export default async function handler(
    req,
    res
) {
    if (req.method === 'POST') {
        console.log("Post method.Start..", req.body)
        try {
            // Validate the cart details that were sent from the client.
            const cartItems = req.body;
            //will use validation once (products  are set up in firebase db as inventory)
            // const line_items = validateCartItems(inventory, cartItems);

            const line_items = cartToLineItems(cartItems)
            // Create Checkout Sessions from body params.
            const params = {
                submit_type: 'pay',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                line_items,
                mode: 'payment',
                success_url: `${req.headers.origin}/checkoutResult?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/checkout`,
            };
            const checkoutSession = await stripe.checkout.sessions.create(
                params
            );
            console.log("Sending response, ", checkoutSession)
            res.status(200).json(checkoutSession);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
