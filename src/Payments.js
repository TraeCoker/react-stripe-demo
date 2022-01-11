import React, { useState } from 'react';
import { fetchFromAPI } from './helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Payments() {
    const stripe = useStripe();
    const elements = useElements();

    const [amount, setAmount] = useState();
    const [paymentIntent, setPaymentIntent] = useState();

    //Create payment intent on server
    const createPaymentIntent = async(event) => {

        //Clamp amount to Strip min/max
        const validAmount = Math.min(Math.max(amount, 50), 999999);
        setAmount(validAmount);

        //Make API request
        const pi = await fetchFromAPI('payments', {body: {amount: validAmount } });
        setPaymentIntent(pi);
    };


    return(
        <>

          <div>
            <input
             type="number"
             value={amount}
             disabled={paymentIntent}
             onChange={(e) => setAmount(e.target.value)}
            />
           <button
             disabled={amount <= 0}
             onClick={createPaymentIntent}
             hidden={paymentIntent}>
             Ready to Pay ${ (amount / 100).toFixed(2) }
          </button>
         </div>

        </>
    )


}