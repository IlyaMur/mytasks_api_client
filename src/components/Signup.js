import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import { Formik } from 'formik';

const Signup = ({ setIsAUth }) => {

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("*Password is required"),
    email: Yup.string()
      .email("*Must be a valid email address")
      .max(100, "*Email must be less than 100 characters")
      .required("*Email is required"),
    username: Yup.string()
      .max(15, "*Username must be less than 15 characters")
      .required("*Username is required"),
  })

  const handleSubmit = async (values) => {
    const { email, password, username } = values;

    try {
      await AuthService.signup(email, username, password).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          setIsAUth(true);
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-3 mt-4">
      <Formik initialValues={{ email: "", password: "", username: '' }}
        validationSchema={validationSchema}
        onSubmit={(handleSubmit)}
      >
        {({ values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (

          <Form onSubmit={handleSubmit}>
            <h1 className="text-center"> Signup </h1>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email" type="email" placeholder="Enter email" onChange={handleChange} onBlur={handleBlur} value={values.email} className={touched.email && errors.email ? "error" : null}
              />
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username" type="text" placeholder="Enter your username" onChange={handleChange} onBlur={handleBlur} value={values.username} className={touched.username && errors.username ? "error" : null}
              />
              {touched.username && errors.username ? (
                <div className="error-message">{errors.username}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password" type="password" onChange={handleChange} onBlur={handleBlur} placeholder="Password" value={values.password} className={touched.password && errors.password ? "error" : null}
              />
              {touched.password && errors.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4" >
              Sign Up
            </Button >
          </Form>
        )}
      </Formik>
      {/* {errors.general && (<p className='text-danger text-end'>{errors.general}</p>)} */}

    </div>
  );
};

export default Signup;
