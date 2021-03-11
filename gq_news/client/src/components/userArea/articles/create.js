import React, {useEffect, useState} from 'react';
import UserAreaHoc from "../../hoc/userAreaHoc";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Form, Button, Alert, Row, Col} from 'react-bootstrap';
import ToastsHandler from "../../utils/toasts";
import {useDispatch} from "react-redux";
import {getCategories} from "../../../api";
import {createPost, clearCreatedPost} from "../../../store/actions";

const Create = () => {
  const [categories, setCategories] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      excerpt: '',
      content: '',
      status: '',
      categories: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('THis field is required'),
      excerpt: Yup.string().required('THis field is required'),
      content: Yup.string().required('THis field is required'),
      status: Yup.string().required('THis field is required').matches(/(DRAFT|PUBLIC)/, {message: 'It should be DRAFT or PUBLIC', excludeEmptyString: true}),
      categories: Yup.string().required('THis field is required'),
    }),
    onSubmit: (values, {resetForm}) => {
      dispatch(createPost(values)).then(({payload}) => {
        if (payload.createdPost.error) {
          ToastsHandler(payload.createdPost.error, 'ERROR');
        } else {
          ToastsHandler('Post created', 'SUCCESS');
          resetForm();
        }
      });
    }
  });

  useEffect(() => {
    const func = async () => {
      const response = await getCategories();
      setCategories(response.categories);
    }
    func();

    return () => dispatch(clearCreatedPost());
  }, [setCategories, dispatch]);

  return (
    <UserAreaHoc>
      <Form onSubmit={formik.handleSubmit} className="mt-3">
        <Row className="mb-4">
          <Col>
            <h1>Create password</h1>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <Alert variant="danger">{formik.errors.title}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Excerpt</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter excerpt"
            id="excerpt"
            name="excerpt"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.excerpt}
          />
          {formik.touched.excerpt && formik.errors.excerpt ? (
            <Alert variant="danger">{formik.errors.excerpt}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter content"
            id="content"
            name="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content ? (
            <Alert variant="danger">{formik.errors.content}</Alert>
          ) : null}
        </Form.Group>
        <hr/>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            id="categories"
            name="categories"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categories}
          >
            <option value=""></option>
            {categories && categories.map((item, i) => (<option key={i} value={item._id}>{item.name}</option>))}
          </Form.Control>
          {formik.touched.categories && formik.errors.categories ? (
            <Alert variant="danger">{formik.errors.categories}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            id="status"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <option value=""></option>
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLIC">PUBLIC</option>
          </Form.Control>
          {formik.touched.status && formik.errors.status ? (
            <Alert variant="danger">{formik.errors.status}</Alert>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit">Add post</Button>
      </Form>
    </UserAreaHoc>
  );
};

export default Create;