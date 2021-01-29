import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/auth.actions';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('not same password');
    } else {
      setError('');
      dispatch(register(name, email, password));
    }
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center text-center'
      style={{ minHeight: '90vh' }}
    >
      <div>
        <h1 className='text-primary'>Register</h1>
        {error && <h2>{error}</h2>}
        <Form style={{ width: '330px' }} onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicName'>
            <Form.Control
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group controlId='formConfirmPassword'>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit' block>
            Register
          </Button>
        </Form>
        <p>
          Already have an account? <Link to='/login'>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
