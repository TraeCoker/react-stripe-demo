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

    //Handle submission of card details
    const handleSubmit = async(event) =>{
        event.preventDefault();

        const cardElement = elements.getElement(CardElement);

        //Confirm card payment
        const {
            paymentIntent: updatedPaymentIntent,
            error,
        } = await stripe.confirmCardPayment(paymentIntent.client_secret,{
            payment_method: {card: cardElement},
        });

        if (error){
            console.log(error);
            error.payment_intent && setPaymentIntent(error.payment_intent);
        } else {
            setPaymentIntent(updatedPaymentIntent);
        }
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

          <form onSubmit={handleSubmit}>
            <CardElement />
            <button  type="submit">
              Pay
            </button>
          </form>

        </>
    )


}