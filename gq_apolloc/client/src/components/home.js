import React, {useState} from 'react';
import {Card, CardGroup, Form, Button} from 'react-bootstrap';
import {gql, useQuery, useLazyQuery, NetworkStatus} from '@apollo/client';

const GET_USER_BY_ID = gql`
    query GetUserByID($id: ID!) {
        user(id: $id) {
            id
            name
            email
            lastname
        }
    }
`;

const GET_ALL_USERS = gql`
    query {
        users {
            id
            name
            lastname
            email
        }
    }
`;

const Home = () => {
  const [user, setUser] = useState('');
  // const {data: dataUsers, loading: loadingUsers, error: errorsUsers} = useQuery(GET_USER_BY_ID);
  const {data: dataAllUsers, loading: loadingAllUsers, error: errorsAllUsers, startPolling, stopPolling, refetch, networkStatus} = useQuery(GET_ALL_USERS, {
    // pollInterval: 3000
    notifyOnNetworkStatusChange: true
  });
  const [userGetLazy, userGetLazyResult] = useLazyQuery(GET_USER_BY_ID/*, {
    variables: {
      id: user
    }
  }*/);

  const handleSubmit = (e) => {
    e.preventDefault();
    userGetLazy({
      variables: {
        id: user
      }
    });
  };

  if(networkStatus === NetworkStatus.ready) console.log('Ready');

  return (
    <div className="App">
      <>
        <h3>All users</h3>
        <CardGroup>
          {dataAllUsers && dataAllUsers.users.map((item, i) => (
            <Card key={i}>
              <Card.Body>
                <Card.Title>{item.email}</Card.Title>
                <Card.Title>{item.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      </>
      <>
        <h3>Get user by id</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter user ID"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        {userGetLazyResult.data && (
          <div className="mt-3">
            <div>{userGetLazyResult.data.user.name}</div>
            <div>{userGetLazyResult.data.user.lastname}</div>
            <div>{userGetLazyResult.data.user.email}</div>
          </div>
        )}
      </>
      <hr/>
      <Button onClick={() => stopPolling()}>Stop polling</Button>
      <Button onClick={() => startPolling(1000)}>Start polling</Button>
      <hr/>
      <Button onClick={() => refetch({variables: {id: 2}})}>re fetch</Button>
    </div>
  );
}

export default Home;
