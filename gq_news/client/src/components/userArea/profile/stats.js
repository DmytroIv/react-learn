import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserStats} from "../../../store/actions";
import {Card, CardGroup, Alert} from "react-bootstrap";

const Stats = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserStats(user.auth._id));
  }, [dispatch, user.auth._id]);

  return (
    <>
      {
        user.stats ?
          <>
            <h3>Your stats</h3>
            <CardGroup>
              <Card border="primary">
                <Card.Body>
                  <Card.Title>Categories created by you:</Card.Title>
                  {user.stats.categories.length === 0 ?
                    "Sorry ou dont have categories"
                  :
                    user.stats.categories.map((item, i) => (
                      <Alert key={i} variant="primary">
                        {item.name}
                      </Alert>
                    ))
                  }
                </Card.Body>
              </Card>
              <Card border="info">
                <Card.Body>
                  <Card.Title>Last created posts:</Card.Title>
                  {user.stats.categories.length === 0 ?
                    "Sorry ou dont have posts"
                    :
                    user.stats.posts.map((item, i) => (
                      <Alert key={i} variant="info">
                        - {item.title}
                      </Alert>
                    ))
                  }
                </Card.Body>
              </Card>
            </CardGroup>
          </>
          :
          null
      }
    </>
  );
};

export default Stats;