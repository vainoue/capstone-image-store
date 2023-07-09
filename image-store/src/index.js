import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ImageProvider } from './contexts/ImageContext';
import { UserProvider } from './contexts/UserContext';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBD5u-sFMdh6JUh25TGNMStKb1UDJKcU6U',
  authDomain: 'image-store-b643b.firebaseapp.com',
  projectId: 'image-store-b643b',
  storageBucket: 'image-store-b643b.appspot.com',
  messagingSenderId: '407468462842',
  appId: '1:407468462842:web:adabd171107650f1f62f43',
  measurementId: 'G-W5SG4DD3JC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ImageProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ImageProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
