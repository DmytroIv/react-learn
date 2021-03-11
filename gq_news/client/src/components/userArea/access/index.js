import React, {useEffect, useState} from 'react';
import {Form, Button, Row, Col, Alert} from 'react-bootstrap';
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {signupUser, loginUser} from "../../../store/actions";
import ToastsHandler from "../../utils/toasts";


const UserAccess = (props) => {
  const dispatch = useDispatch();
  const [type, setType] = useState(true);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(5, 'Must be more than 5 chars').required('Password is required')
    }),
    onSubmit: (values) => {
      onSubmitHandler(values);
    }
  });

  useEffect(() => {
    return function cleanup() {
      // dispatch clear user errors
    }
  }, []);

  const onSubmitHandler = (values) => {
    if (type) {
      // sign in
      dispatch(loginUser(values)).then(({payload}) => {
        successHandler(payload);
      });
    } else {
      // register
      dispatch(signupUser(values)).then(({payload}) => {
        successHandler(payload);
      });
    }
  }

  const switchTypeHandler = () => {
    setType(!type);
  }

  const successHandler = (payload) => {
    const errors = payload.errors;
    const auth = payload.auth;

    if (errors) {
      ToastsHandler(errors, 'ERROR');
    }

    if (auth) {
      localStorage.setItem('X-AUTH', auth.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token;
      ToastsHandler('Welcome', 'SUCCESS');
      props.history.push('/');
    }
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-4">
          <Col>
            <h1>Sign in / register</h1>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Alert variant="danger">{formik.errors.email}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Alert variant="danger">{formik.errors.password}</Alert>
          ) : null}
        </Form.Group>
        {type ?
          <Button variant="primary" type="submit">Sign in</Button>
          :
          <Button variant="primary" type="submit">Register</Button>
        }
        <Button
          variant="secondary"
          className="ml-2"
          onClick={switchTypeHandler}
        >Already {type ? 'Signed in' : 'Register'} click here</Button>
      </Form>
    </>
  );
};

export default UserAccess;