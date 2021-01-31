import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import { ClipLoader } from "react-spinners";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [validateError, setValidateError] = useState("");
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.blog);
  const loading = useSelector((state) => state.blog.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogActions.getBlog(id));
  }, [dispatch, id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === blog.title || content === blog.content) {
      setValidateError("you have change something");
      return;
    }
    dispatch(blogActions.updateBlog(title, content, images, id));
  };
  return (
    <div>
      {validateError && <h1>{validateError}</h1>}
      {loading ? (
        <div className='text-center mt-5'>
          <ClipLoader color='#f86c6b' size={150} loading={true} />
        </div>
      ) : (
        <>
          {blog && (
            <>
              <div className='create-new-blog'>
                <h2>Edit Blog</h2>
                <form onSubmit={handleSubmit}>
                  <label>Title:</label>
                  <input
                    type='text'
                    required
                    defaultValue={blog.title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                  <label>Content:</label>
                  <textarea
                    defaultValue={blog.content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                  <label>Image Link (optional):</label>
                  <input
                    type='text'
                    defaultValue={blog.images}
                    onChange={(e) => setImages(e.target.value)}
                    onSubmit={(e) => setImages(images.push(e.target.value))}
                  ></input>
                  <button type='submit'>Edit blog</button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EditBlog;
