import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth.actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [isAuthenticated, history]);
  return (
    <Container>
      <h1 className='text-primary'>Sign In</h1>
      <h2>Sign Into Your Account</h2>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(login(email, password));
        }}
      >
        <Form.Group controlId='formBasicEmail'>
          <Form.Control
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
