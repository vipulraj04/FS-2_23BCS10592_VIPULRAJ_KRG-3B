import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function CheckoutForm() {
    const [amount, setAmount] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) {
            alert("Please enter valid amount");
            return;
        }
        if (!stripe || !elements) {
            alert("Stripe not loaded");
            return;
        }
        let clientSecret;
        try {
            // 1. Create PaymentIntent
            const res = await fetch("http://localhost:8080/api/payment/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: Number(amount) })
            });

            if (!res.ok) {
                throw new Error("Backend error");
            }

            const data = await res.json();
            clientSecret = data.clientSecret;
            

        } catch (error) {
         
            alert("Backend not running or CORS issue");
            return;
        }

        // 2. Confirm payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (result.error) {
            alert(result.error.message);
            return;
        }
    
       
        // 3. Book appointment
        if (result.paymentIntent.status === "succeeded") {
            await fetch("http://localhost:8080/api/appointments/book-with-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                
                body: JSON.stringify({
                    patientId: 1,
                    doctorId: 1,
                    date: "2026-03-20",
                    amount: Number(amount),
                    paymentIntentId: result.paymentIntent.id
                })
            });

            alert("Appointment Booked Successfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="number"
                placeholder="Enter Amount (₹)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

          

            <CardElement />

            <br />

            <button type="submit">Pay & Book</button>

        </form>
    );
}

export default CheckoutForm;
