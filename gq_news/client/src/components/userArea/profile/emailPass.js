import React from 'react';
import {Form, Button, Alert, Row, Col} from 'react-bootstrap';
import {useFormik} from "formik";
import * as Yup from 'yup';
import ToastsHandler from "../../utils/toasts";
import {useDispatch, useSelector} from "react-redux";
import {updateUserEmailPass} from "../../../store/actions";

const EmailPass = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.auth.email,
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email'),
      password: Yup.string().min(5, 'Must be more than 5 chars')
    }),
    onSubmit: (values) => {
      onSubmitHandler(values);
    }
  });

  const onSubmitHandler = ({email, password}) => {
    dispatch(updateUserEmailPass(email, password, user.auth._id)).then(({payload}) => {
      if (payload.errors) {
        ToastsHandler(payload.errors, 'ERROR');
      } else {
        ToastsHandler('Profile updated', 'SUCCESS');
      }
    });
  };

  return (
    <div className="mt-3">
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-4">
          <Col>
            <h1>Update email or password</h1>
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
        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default EmailPass;