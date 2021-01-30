import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';

import blogActions from '../redux/actions/blog.actions';

const AddReviewForm = ({ blogId }) => {
  const [review, setReview] = useState('');

  const dispatch = useDispatch();

  const handleReviewSubmit = (e, submittedReview, blogId) => {
    e.preventDefault();
    setReview('');
    dispatch(blogActions.submitReview(submittedReview, blogId));
  };

  return (
    <Form
      onSubmit={(e) => {
        console.log('Hello');
        handleReviewSubmit(e, review, blogId);
      }}
    >
      <Form.Row className='align-items-center'>
        <Col sm={9} className='my-1'>
          <Form.Label htmlFor='inlineFormInputReview' srOnly>
            Review
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Wanna say something?'
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </Col>
        <Col xs='auto' className='my-1'>
          <Button type='submit'>Review</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default AddReviewForm;
