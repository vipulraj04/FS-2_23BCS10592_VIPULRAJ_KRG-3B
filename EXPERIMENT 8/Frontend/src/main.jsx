import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51TEBus1RBny5wBJypEpG3c8SKctntlcmkWyfnj01OoQV0z7NtyLa0BVbd2jsOhMNMku3TWL58At16Kx2Iaa3Ejxm00Y4tFhI6v");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Elements stripe={stripePromise}>
    <App />
    </Elements>
  </StrictMode> ,
)
