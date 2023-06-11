import React from 'react';
import '../styles/Register.css';
import { NavLink } from 'react-router-dom';
import axiosSet from '../axiosConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [password, setPassword] = useState()

  const signUp = async (e) => {
    e.preventDefault();

    console.log(email,
                firstName,
                lastName,
                phone,
                address,
                password);

    await axiosSet.post("/api/user", {
      userId: 98761234,
      email,
      firstName,
      lastName,
      phone,
      address,
      password,
      role: "admin",
    });

  }

  return (
    <div className='register-body'>
      <h1>Register</h1>
      <form onSubmit={(e) => signUp(e)}>
        <label htmlFor="firstName">First name:</label>
        <input
          type='text'
          name="firstName"
          id="firstName"
          placeholder="Insert your first name"
          onChange={(e) => setFirstName(e.target.value)}
        /><br />
        <label htmlFor="lastName">Last name:</label>
        <input
          type='text'
          name="lastName"
          id="lastName"
          placeholder="Insert your last name"
          onChange={(e) => setLastName(e.target.value)}
        /> <br />
        <label htmlFor="email">Email:</label>
        <input
          type='email'
          name="email"
          id="email"
          placeholder="Insert your email"
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="1234567890"
          onChange={(e) => setPhone(e.target.value)}
        /><br />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Insert your address"
          onChange={(e) => setAddress(e.target.value)}
        /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        /> <br />
        <input type='submit' value="Confirm Registration" />
        <NavLink to="/login">Already have an account? Sign in!</NavLink>
      </form>
    </div>
  )
};

export default Register;