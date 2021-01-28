import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const JumbotronBlog = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Jumbotron>
      <h1>Social Blog</h1>
      <p>Write about your amazing experiences.</p>
      {isAuthenticated && (
        <p>
          <Button variant='primary'>Write now</Button>
        </p>
      )}
    </Jumbotron>
  );
};

export default JumbotronBlog;
