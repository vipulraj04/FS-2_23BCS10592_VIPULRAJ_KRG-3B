import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getDoctors = () => axios.get(`${API_BASE_URL}/doctors`);
export const getPatients = () => axios.get(`${API_BASE_URL}/v1/patient`);

export const createPaymentIntent = (amount) => 
    axios.post(`${API_BASE_URL}/api/payment/create-payment-intent`, { amount });

export const bookWithPayment = (data) => 
    axios.post(`${API_BASE_URL}/api/appointments/book-with-payment`, data);
