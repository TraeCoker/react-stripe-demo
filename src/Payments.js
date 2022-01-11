import React, { useState } from 'react';
import { fetchFromAPI } from './helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Payments() {
    const stripe = useStripe();
    const elements = useElements();

    const [amount, setAmount] = useState();
    const [paymentIntent, setPaymentIntent] = useState();


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