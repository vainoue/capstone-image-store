import React from 'react';

const Register = () => {
  return <div>
    <h1>Register</h1>
    <form method="post">
        <label>First name:</label>
        <input type='text' /><br />
        <label>Last name:</label>
        <input type='text' /> <br />
        <label>Email:</label>
        <input type='email' /><br />
        <labell>Password</labell>
        <input type='password' /><br />
        <label>Confirm Password</label>
        <input type='password' /><br />
        <input type='submit' value={"Confirm Registration"}/>
    </form>
  </div>;
};

export default Register;