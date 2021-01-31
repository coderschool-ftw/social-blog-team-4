import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import blogActions from "../redux/actions/blog.actions";
import Reactions from "../components/Reactions";
import AddReviewForm from "../components/AddReviewForm";
import { useHistory } from "react-router-dom";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const BlogDetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = localStorage.getItem("_id");

  const blog = useSelector((state) => state.blog.blog);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let reviews;
  if (blog && blog.reviews) {
    reviews = blog.reviews.slice().reverse();
  }
  const loading = useSelector((state) => state.blog.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogActions.getBlog(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    fetch(`${BACKEND_API}/blogs/` + blog._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <Container className="BlogDetailPage">
      {loading ? (
        <div>Loading blog detail</div>
      ) : (
        <>
          {blog && (
            <>
              <div className="Blog-detail">
                <div>{blog.title}</div>
                <div>
                  @{blog.author.name + " "}
                  <Moment fromNow>{blog.author.createdAt}</Moment>
                </div>
                <div>{blog.content}</div>
              </div>
              <div>
                {/* If current user is also author, show edit button */}
                {currentUser === blog?.author?._id ? (
                  <>
                    <Link to={`/blog/edit/${blog._id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <></>
                )}
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
