import React from 'react';
import '../styles/Login.css';
import { NavLink } from 'react-router-dom';
import axiosSet from '../axiosConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState()

    const [password, setPassword] = useState()

    const signIn = async (e) => {
        e.preventDefault();

        //console.log(email, password); display the value on console
        
        // insert backend URL to check email and password
        //const post = {email, password};
        //await axiosSet.post("/url", {
        //     body: post, 
        // });     
    };

  return (
  <div className='login-body'>
    <h1>Login</h1>
    <form onSubmit={(e) => signIn(e)}>
        <label htmlFor="email">Email:</label>
        <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
        /><br />
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
        /> <br />
        <input type='submit' value="Sign in"/>
        <NavLink to="/register">Don't have an account yet? Sign up!</NavLink>
    </form>
  </div>
)};

export default Login;