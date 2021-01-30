import React, { useEffect, useState } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import blogActions from '../redux/actions/blog.actions';
import Reactions from '../components/Reactions';

const BlogDetailPage = () => {
  const { id } = useParams();

  const blog = useSelector((state) => state.blog.blog);
  let reviews;
  if (blog && blog.reviews) {
    reviews = blog.reviews.slice().reverse();
  }
  const loading = useSelector((state) => state.blog.loading);

  const [review, setReview] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogActions.getBlog(id));
  }, [dispatch, id]);

  const handleReviewSubmit = (e, submittedReview, blogId) => {
    e.preventDefault();
    setReview('');
    dispatch(blogActions.submitReview(submittedReview, blogId));
  };

  return (
    <Container className='BlogDetailPage'>
      {loading ? (
        <div>Loading blog detail</div>
      ) : (
        <>
          {blog && (
            <>
              <div className='Blog-detail'>
                <div>{blog.title}</div>
                <div>
                  @{blog.author.name + ' '}
                  <Moment fromNow>{blog.author.createdAt}</Moment>
                </div>
                <div>{blog.content}</div>
              </div>

              <Reactions blog={blog} dispatch={dispatch} id={id} />

              <Form
                onSubmit={(e) => {
                  console.log('Hello');
                  handleReviewSubmit(e, review, id);
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

              <ul>
                {reviews.map((r) => (
                  <li key={r._id}>
                    <strong>{r.user.name}</strong>
                    <span> says </span>
                    <strong>{r.content}</strong>
                    <span>
                      , <Moment fromNow>{r.createdAt}</Moment>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default BlogDetailPage;
