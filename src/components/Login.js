import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Link } from "react-router-dom";

const Login = ({ setLoginShow }) => {
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("*Password is required"),
    email: Yup.string()
      .email("*Must be a valid email address")
      .max(100, "*Email must be less than 100 characters")
      .required("*Email is required")
  })

  const handleSubmit = async values => {
    const { email, password } = values;

    const response = await AuthService.login(email, password);
    const json = await response.text();
    const data = JSON.parse(json);

    if (!response.ok) {
      setErrors(data);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
      window.location.reload();

    }
  };

  return (
    <div className="p-3 mt-4">
      <Formik initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(handleSubmit)}
      >
        {({ values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (

          <Form onSubmit={handleSubmit}>
            <h1 className="text-center"> Login </h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email" type="email" placeholder="Enter email" onChange={handleChange} onBlur={handleBlur} value={values.email} className={touched.email && errors.email ? "error" : null}
              />
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password" type="password" onChange={handleChange} onBlur={handleBlur} placeholder="Password" value={values.password} className={touched.password && errors.password ? "error" : null}
              />
              {touched.password && errors.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}
            </Form.Group>
            Don't have an account? <Link to={"/signup"}>
              Sign up
            </Link>! <div></div>

            <Button variant="primary" type="submit" className="mt-4" >
              Log In
            </Button >
          </Form>
        )}
      </Formik>
      {errors.general && (<p className='text-danger text-end'>{errors.general}</p>)}
    </div>
  );
};

export default Login;
