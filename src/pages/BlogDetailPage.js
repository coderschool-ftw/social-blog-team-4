import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import blogActions from "../redux/actions/blog.actions";
import Reactions from "../components/Reactions";
import AddReviewForm from "../components/AddReviewForm";

const BlogDetailPage = () => {
  const { id } = useParams();

  const blog = useSelector((state) => state.blog.blog);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let reviews;
  if (blog && blog.reviews) {
    reviews = blog.reviews.slice().reverse();
  }
  const loading = useSelector((state) => state.blog.loading);
  const error = useSelector((state) => state.blog.error);

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
                  @{blog.author.name + " "}
                  <Moment fromNow>{blog.author.createdAt}</Moment>
                </div>
                <div>{blog.content}</div>
              </div>

              <Reactions
                blog={blog}
                dispatch={dispatch}
                id={id}
                isAuthenticated={isAuthenticated}
              />

              {isAuthenticated && <AddReviewForm blogId={id} />}

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
