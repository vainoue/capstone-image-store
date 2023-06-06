import React from 'react';

const Register = () => {
  return <div>
    <h1>Register</h1>
    <form method="post">
        <label>First name:</label>
        <input type='text' /><br />
        Last name:
        <input type='text' /> <br />
        Email:
        <input type='email' /><br />
        Password:
        <input type='password' /><br />
        Confirm Password:
        <input type='password' /><br />
        <input type='submit' value={"Confirm Registration"}/>
    </form>
  </div>;
};

export default Register;