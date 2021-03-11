import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

const UserAreaHoc = ({children}) => {

  return (
    <>
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
          <LinkContainer to="/user_area/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/user_area/articles">
            <Nav.Link>Articles</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/user_area/create">
            <Nav.Link>Add post</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div>
        {children}
      </div>
    </>
  );
};

export default UserAreaHoc;