import React, { useState, useEffect, Suspense } from 'react';
import { fetchFromApi } from './helpers';
import { CardElement } from '@stripe/react-stripe-js';
import { useUser, AuthCheck } from 'reactfire';

import { db } from './firebase';
import { SignIn, SignOut } from './Customers';

function UserData(props) {

    const [data, setData] = useState({});

    //Subscribe to the user's data in Firestore
    useEffect(
        () => {
            const unsubscribe = db.collection('users').doc(props.user.uid).onSnapshot(doc => setData(doc.data))
            return () => unsubscribe()
        },
        [props.user]
    )

    return (
        <pre>
            Stripe Customer ID: {data.stripeCustomerId} <br />
            Subscriptions: {JSON.stringify(data.activePlans || [])}
        </pre>
    );

}