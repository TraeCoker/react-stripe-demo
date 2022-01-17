import React, { useState, useEffect, Suspense } from 'react';
import { fetchFromAPI } from './helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useUser, AuthCheck } from 'reactfire';
import firebase from 'firebase/compat/app';
import { auth, db } from './firebase';

export function SignIn() {
    const signIn = async () => {
        const credential = await auth.singInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        );
        const { uid, email } = credential.user;
        db.collection('users').doc(uid).set({ email }, { merge: true });
    };

    return(
        <button onClick={signIn}>
            Sign In with Google
        </button>
    );
}

export function SignOut(props){
    return props.user && (

        <button onClick={() => auth.signOut()}>
            Sign Out User {props.user.uid}
        </button>
    )
}

function SaveCard(props) {
    const stripe = useStripe();
    const elements = useElements();
    const user = useUser();

    const [setupIntent, setSetupIntent] = useState();
    const [wallet, setWallet] = useState([]);

    //Get the user's wallet on moun
    useEffect(() => {
       getWallet(); 
    }, [user]);

    //Create the setup intent
    const createSetupItent = async (event) => {
        const si = await fetchFromAPI('wallet')
        setSetupIntent(si);
    };

    //Handle the submission of card details
    const handleSubmit = async (event) => {
        event.preventDefault();

        const cardElement = elements.getElement(cardElement)

        //Confirm Card Setup
        const {
            setupIntent: updatedSetupIntent,
            error,
        } = await stripe.confirmCardSetup(setupIntent.client_secret, {
            payment_method: {card: cardElement},
        });

        if (error) {
            alert(error.message);
            console.log(error);
        } else {
            setSetupIntent(updatedSetupIntent);
            await getWallet();
            alert('Success! Card added to your wallet'); 
        }
    };

    const getWallet = async () => {
        if (user){
            const paymentMethods = await fetchFromAPI('wallet', {method: 'GET' })
            setWallet(paymentMethods);
        }
    };

    return (
        <>
            <AuthCheck fallback={<SignIn />}>
              <div>
                <button
                    onClick={createSetupItent}
                    hidden={setupIntent}>
                    Attach New Credit Card
                </button>
              </div>
              <hr />

              <form onSubmit={handleSubmit}>

                  <CardElement />
                  <button type='submit'>
                      Attach
                  </button>
              </form>

              <div>
                <h3>Retrieve all Payment Sources</h3>
                <select>
                    {wallet.map((paymentSource) => (
                        <CreditCard key={paymentSource.id} card={paymentSource.card} />
                    ))}
                </select>
              </div>              
                <div>
                    <SignOut user={user}/>
                </div>
            </AuthCheck>
        </>
    );
}

//Takes individual card as props
function CreditCard(props) {
    const { last4, brand, exp_month, exp_year } = props.card 
    return(
        <option>
            {brand} **** **** **** {last4} expires {exp_month}/{exp_year}
        </option>
    );
}

//Reactfire uses suspense under the hood and requires component to be wrapped insuspense
export default function Customers() {
    return (
        <Suspense fallback={'loading user'}>
            <SaveCard />
        </Suspense>
    );
}