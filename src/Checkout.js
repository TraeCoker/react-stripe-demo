import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "./helpers";
import { stripePromise } from ".";

export function Checkout(){
    const stripe = useStripe();

    const [product, setProduct] = useState({
        name: 'Hat',
        description: 'Pug hat. A hat your pug will love.',
        images: [
            'https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        ],
        amount: 799,
        currency: 'usd',
        quantity: 0,
    });

    const changeQuantity = (v) => setProduct({...product, quantity: Math.max(0, product.quantity + v)});

    const handleClick = async (event) => {
        const body = {line_items: [product] };
        const {id: sessionId } = await fetchFromAPI('checkouts', {
            body
        });

        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });

        if(error) {
            console.log(error);
        };
    };

    return (
        <>
    
          <div>
            <h3>{product.name}</h3>
            <h4>Stripe Amount: {product.amount}</h4>
    
            <img src={product.images[0]} width="250px" alt="product" />
    
            <button
              onClick={() => changeQuantity(-1)}>
              -
            </button>
            <span>
              {product.quantity}
            </span>
            <button
              onClick={() => changeQuantity(1)}>
              +
            </button>
          </div>
    
          <hr />
    
          <button
            onClick={handleClick}
            disabled={product.quantity < 1}>
            Start Checkout
          </button>
        </>
      );

}

export function CheckoutFail(){
    return <h3>Checkout failed!</h3>
}

export function CheckoutSuccess(){
    const url = window.location.href;
    const sessionId = new URL(url).searchParams.get('session_id');
    <h3>Checkout was a success! {sessionId}</h3>
}