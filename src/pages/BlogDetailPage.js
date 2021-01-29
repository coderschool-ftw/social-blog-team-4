import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import blogActions from '../redux/actions/blog.actions';

const BlogDetailPage = () => {
  const { id } = useParams();

  const blog = useSelector((state) => state.blog.blog);
  const loading = useSelector((state) => state.blog.loading);

  const [showSelector, setShowSelector] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogActions.getBlog(id));
  }, [dispatch, id]);
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
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default BlogDetailPage;
