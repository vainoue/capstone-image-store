import React from 'react';
import '../styles/Register.css';
import { Link, NavLink } from 'react-router-dom';
import axiosSet from '../axiosConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';


const Register = () => {

  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]+$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special symbol'),
    phone: Yup.string()
      .matches(/^[0-9\- ]{10}$/, 'Phone number must contain 10 digits'),
    confirmPassword: Yup.string()
      .required('Re-enter password')
      .oneOf([Yup.ref("password")], "Passwords are not the same"),
  })

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [password, setPassword] = useState()

  const signUp = async (e) => {

    console.log(email,
      firstName,
      lastName,
      phone,
      address,
      password);

    await axiosSet.post("/api/user", {
      userId: 987654321,
      email: e.email,
      firstName: e.firstName,
      lastName: e.lastName,
      phone: e.phone,
      address: e.address,
      password: e.password,
      role: "user",
      cart: [],
      likes: [],
      transaction: [],
    });

    navigate('/');

  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Link to="/" className="d-flex justify-content-center">
        <h1 className="text-center mt-5">DevCorner</h1>
      </Link>
      <div className="sign-up-body d-flex align-items-center justify-content-center flex-column mt-2">
        <Card
          className="signup-card mt-4"
          variant="outlined"
          sx={{
            width: 300,
            padding: 1,
          }}
        >
          <CardHeader
            title="Register"
            className="signup-card-header mt-2"
            sx={{
              fontSize: 20,
            }}
          />
          <CardContent className="signup-card-content">
            {error && <p className="error">{error}</p>}
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={signUp}
            >
              <Form>
                <div>
                  <label htmlFor="firstName" className="mt-3">First name:</label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Insert your first name"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mt-3">Last name:</label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Insert your last name"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mt-3">Email:</label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Insert your email"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mt-3">Phone:</label>
                  <Field
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="1234567890"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="mt-3">Address:</label>
                  <Field
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Insert your address"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mt-3">Password:</label>
                  <div className="password-field">
                    <Field
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="signup-field"
                    />
                    {passwordVisible ? (
                      <AiOutlineEye
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="mt-3">Confirm password:</label>
                  <div className="password-field">
                    <Field
                      type={passwordVisible ? 'text' : 'password'}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Enter your password"
                      className="signup-field"
                    />
                    {passwordVisible ? (
                      <AiOutlineEye
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    className="mt-3"
                    color="primary"
                    variant="contained"
                  >
                    Confirm Registration
                  </Button>
                  <NavLink to="/login" className="mt-3">Already have an account? Sign in!</NavLink>
                </div>
              </Form>
            </Formik>
          </CardContent>
        </Card>
      </div >
    </>
  );
};

export default Register;