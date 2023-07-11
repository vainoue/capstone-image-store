import './App.css';
import axiosSet from './axiosConfig';
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import ImageInformation from './pages/ImageInformation';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import CheckoutForm from './pages/CheckoutForm';
import ImageUpload from './pages/ImageUpload';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LikedImage from './pages/LikedImage';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  'pk_test_51NNV0sK99pLuShav4XQEj9HQ969kexFwql2qttg2Epqyv6e5CdgeaIbajVxEgsAWYxaPEuFNcapdUkfifVnJjohp00JGRjUdbU'
);

function App() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="image/:imageId" element={<ImageInformation />} />
            <Route path="liked" element={<LikedImage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
            <Route path="image/imageUpload" element={<ImageUpload />} />
            <Route
              path="cart/checkout"
              element={
                clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                )
              }
            />
          </Route>
          <Route path="login" element={<Login />} />

          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
