import React, { useState } from 'react';
import { fetchFromAPI } from './helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Payments() {
    const stripe = useStripe();
    const elements = useElements();

    const [amount, setAmount] = useState();
    const [paymentIntent, setPaymentIntent] = useState();

    


}