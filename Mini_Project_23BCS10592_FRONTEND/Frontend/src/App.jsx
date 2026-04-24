import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getDoctors, getPatients, createPaymentIntent, bookWithPayment } from './api';
import './App.css';

// REPLACE with your actual Stripe Public Key from application.properties
const stripePromise = loadStripe('pk_test_51TEBus1RBny5wBJypEpG3c8SKctntlcmkWyfnj01OoQV0z7NtyLa0BVbd2jsOhMNMku3TWL58At16Kx2Iaa3Ejxm00Y4tFhI6v'); 

const BookingForm = ({ doctors, patients }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    amount: 500, // Example amount in INR
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('Processing payment...');

    try {
      // 1. Create PaymentIntent on backend
      const { data: { clientSecret } } = await createPaymentIntent(formData.amount);

      // 2. Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // 3. Complete booking on backend
          const response = await bookWithPayment({
            ...formData,
            paymentIntentId: result.paymentIntent.id,
          });
          setMessage('Success! Appointment booked and email sent.');
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || JSON.stringify(err.response?.data) || err.message;
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-box">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Select Patient</label>
          <select 
            value={formData.patientId} 
            onChange={(e) => setFormData({...formData, patientId: e.target.value})}
            required
          >
            <option value="">-- Choose Patient --</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.email})</option>)}
          </select>
        </div>

        <div className="field">
          <label>Select Doctor</label>
          <select 
            value={formData.doctorId} 
            onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
            required
          >
            <option value="">-- Choose Doctor --</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>)}
          </select>
        </div>

        <div className="field">
          <label>Appointment Date</label>
          <input 
            type="date" 
            value={formData.date} 
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required 
          />
        </div>

        <div className="field">
          <label>Consultation Fee (INR)</label>
          <input 
            type="number" 
            value={formData.amount} 
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            readOnly
          />
        </div>

        <div className="stripe-field">
          <label>Card Details</label>
          <div className="card-container">
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
          </div>
        </div>

        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay & Book Now'}
        </button>
      </form>
      {message && <p className="status-msg">{message}</p>}
    </div>
  );
};

function App() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    getDoctors()
      .then(res => setDoctors(res.data))
      .catch(err => {
        console.error("Error fetching doctors:", err);
        setError("Could not load doctors. Please check if the backend is running.");
      });

    getPatients()
      .then(res => setPatients(res.data))
      .catch(err => {
        console.error("Error fetching patients:", err);
        setError("Could not load patients. Please check if the backend is running.");
      });
  }, []);

  return (
    <div className="app-container">
      {error && <div className="error-banner">{error}</div>}
      <Elements stripe={stripePromise}>
        <BookingForm doctors={doctors} patients={patients} />
      </Elements>
    </div>
  );
}

export default App;
