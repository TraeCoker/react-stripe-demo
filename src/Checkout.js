import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

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

    

}