import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyDCdHTZonx79_GHyPRp9G072KetiMCimOc",
  authDomain: "react-stripe-d0177.firebaseapp.com",
  projectId: "react-stripe-d0177",
  storageBucket: "react-stripe-d0177.appspot.com",
  messagingSenderId: "627641145096",
  appId: "1:627641145096:web:79a4f80e168dc659a13ebd",
  measurementId: "G-SQ083N746K"
};

export const stripePromise = loadStripe(
  'pk_test_51KGBNSEFpPobBmTkltOc1h9VYvzqjyMRayZIyRhSHTSDHfloP7D4JgA9FpcJRPAwiS7dTyMqGG6SKPiyLbMQvyeo00NazYii6J'
);

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Elements stripe={stripePromise}>
          <App />
      </Elements>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


