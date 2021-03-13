import React from 'react';
import {Formik, useFormik} from 'formik';
import {Form, Button} from 'react-bootstrap';
import {gql, useMutation, useQuery} from '@apollo/client';

const ADD_POST = gql`
    mutation AddPost($data: PostInput!) {
        addPost(data: $data) {
            id
            title
            body
            author {
                name
            }
        }
    }
`;

const GET_LAST_POST = gql`
  query {
      lastPost {
          id
          title
          body
      }
  }
`;


const Posts = () => {

  const getLastPost = useQuery(GET_LAST_POST);

  const [addPost, {data, error, loading, called}] = useMutation(ADD_POST, {
    ignoreResults: true,
    variables: {},
    onError: (error) => { console.error(error) },
    onCompleted: (data) => { console.error(data) },
    awaitRefetchQueries: true,
    refetchQueries: [
      {query: GET_LAST_POST}
    ]
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      author: ''
    },
    onSubmit: (values) => {

      addPost({
        variables: {
          data: {...values}
        }
      }).then(res => {console.log(res)});
    }
  });

  if(data) {
    console.log(data);
  }

  console.log(getLastPost);

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="body"
            placeholder="Enter body"
            onChange={formik.handleChange}
            value={formik.values.body}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="author"
            placeholder="Enter author"
            onChange={formik.handleChange}
            value={formik.values.author}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>

      <hr/>
      <h3>The last post: </h3>
      {
        getLastPost && getLastPost.data &&
          <div>
            <div>{getLastPost.data.lastPost.title}</div>
            <div>{getLastPost.data.lastPost.body}</div>
            <div>{getLastPost.data.lastPost.id}</div>
          </div>
      }
    </div>
  );
}

export default Posts;
