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

function SubscribeToPlan(props) {
    const stripe = useStripe();
    const elements = useElements();
    const user = useUser();

    const [plan, setPlan] = useState();
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading ] = useState(false);

    //Get current subscriptions on mount
    useEffect(() => {
        getSubscriptions();
    }, [user]);

    //Fetch current subscriptions from the API
    const getSubscriptions = async () => {
        if(user) {
            const subs = await fetchFromApi('subscriptions', {method: 'GET'});
            setSubscriptions(subs);
        }
    };

    const cancel = async (id) => {
        setLoading(true);
        await fetchFromApi('subscriptions/' + id, { method: 'PATCH'});
        alert('canceled!');
        await getSubscriptions();
        setLoading(false);
    };


    return (
        <>
            <AuthCheck fallback={<SignIn />} >

                <div>

                    <button
                      onClick={() => setPlan('price_1KHf5OEFpPobBmTk37NB2k5c')}>
                      Choose Monthly $25/m
                    </button>

                    <button
                      onClick={() => setPlan('price_1KHf5OEFpPobBmTkLpTaKnk4')}>
                      Choose Quarterly $50/q 
                    </button>

                    <p>
                      Selected Plan: <strong>{plan}</strong>
                    </p>
                </div>
                <hr />

                <form onSubmit={handleSubmit} hidden={!plan}>

                    <CardElement />
                    <button type='submit' disabled={loading}>
                        Subscribe & Pay
                    </button>

                </form>

                <div>
                    <h3>Manage Current Subscriptions</h3>
                    <div>
                      {subscriptions.map((sub) => {
                          <div key={subi.id}>
                              {sub.id}. Next oaynebt of {sub.plan.amount} due {' '}
                              {new Date(sub.current_period_end * 1000).toUTCString()}
                              <button
                                onClick={() => cancel(sub.id)}
                                disabled={loading}>
                                Cancel
                              </button>
                          </div>
                      })}
                    </div>
                </div>

                <div>
                    <SignOut user={user} />
                </div>
            </AuthCheck> 
        </>
    )
}