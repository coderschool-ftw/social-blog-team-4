import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import { Container, Alert } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.blog);
  const loading = useSelector((state) => state.blog.loading);
  const successMsg = useSelector((state) => state.blog.successMsg);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogActions.getBlog(id));
  }, [dispatch, id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(blogActions.updateBlog(title, content, images, id));
  };
  return (
    <Container>
      {successMsg && (
        <Alert variant="success">
          {successMsg}{" "}
          <Alert.Link href="/admin/blogs">
            Please, Click here to come back admin page
          </Alert.Link>
        </Alert>
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {blog && (
            <>
              <div className="create-new-blog">
                <h2>Edit Blog</h2>
                <form onSubmit={handleSubmit}>
                  <label>Title:</label>
                  <input
                    type="text"
                    required="required"
                    placeholder={blog.title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                  <label>Content:</label>
                  <textarea
                    placeholder={blog.content}
                    onChange={(e) => setContent(e.target.value)}
                    required="required"
                  ></textarea>
                  <label>Image Link (optional):</label>
                  <input
                    type="text"
                    defaultValue={blog.images}
                    onChange={(e) => setImages(e.target.value)}
                    onSubmit={(e) => setImages(images.push(e.target.value))}
                  ></input>
                  <button type="submit">Edit blog</button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default EditBlog;
