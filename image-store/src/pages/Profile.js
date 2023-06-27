import React, { useContext } from "react";
import '../styles/Profile.css';
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axiosSet from "../axiosConfig";
import { Button, Card, CardContent } from "@mui/material";
import { useState } from 'react';
import { UserContext } from "../contexts/UserContext";

const Profile = () => {

    //get the userId from URL
    const { user } = useContext(UserContext);
    const { userId } = useParams();
    console.log(userId);

    const [error, setError] = useState();
    const navigate = useNavigate();

    const validationSchema = Yup.object({

    });

    const updateUser = async (e) => {
        await axiosSet.post("/api/user/URL", {
            email: e.email,
            firstName: e.firstName,
            lastName: e.lastName,
            phone: e.phone,
            address: e.address,
        })
    }

    //navigate('/profile/:userId');

    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <h1 className="text-center mt-5">My Account</h1>
            <div className="sign-up-body d-flex align-items-center justify-content-center flex-column mt-2">
                <Card
                    className="profile-card mt-4"
                    variant="outlined"
                    sx={{
                        width: 300,
                        padding: 1,
                    }}
                >
                    <CardContent className="profile-card-content">
                        {error && <p className="error">{error}</p>}
                        <Formik
                            initialValues={{
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                phone: user.phone,
                                address: user.address,
                                userId: user.userId,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={updateUser}
                        >
                            <Form>
                                <div>
                                    <label className="mt-3">First name:</label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        className="profile-field"
                                    />
                                </div>
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="error"
                                />
                                <div>
                                    <label className="mt-3">Last name:</label>
                                    <Field
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className="profile-field"
                                    />
                                </div>
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="error"
                                />
                                <div>
                                    <label className="mt-3">Email:</label>
                                    <Field
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="profile-field"
                                    />
                                </div>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="error"
                                />
                                <div>
                                    <label className="mt-3">Phone:</label>
                                    <Field
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        className="profile-field"
                                    />
                                </div>
                                <ErrorMessage
                                    name="phone"
                                    component="div"
                                    className="error"
                                />
                                <div>
                                    <label className="mt-3">Address:</label>
                                    <Field
                                        type="text"
                                        name="address"
                                        id="address"
                                        className="profile-field"
                                    />
                                </div>
                                <ErrorMessage
                                    name="address"
                                    component="div"
                                    className="error"
                                />
                                <div>
                                    <Button
                                        type="submit"
                                        className="mt-3"
                                        color="primary"
                                        variant="contained"
                                    >
                                        Update profile
                                    </Button>
                                </div>
                            </Form>
                        </Formik>
                    </CardContent>
                </Card>
                <br />
                <br />
                <br />
            </div>
        </>
    )
}

export default Profile;