import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../pages/AddBlog.css";
import { useSelector } from "react-redux";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;

function EditBlog() {
  const blog = useSelector((state) => state.blog.blog);

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [images, setImages] = useState(blog.images);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, content, images };
    console.log(blog);

    fetch(`${BACKEND_API}/blogs/` + blog._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(updatedBlog),
    }).then(() => {
      console.log("new blog added");
      history.push("/");
    });
  };
  return (
    <div className="create-new-blog">
      <h2>Add a new blog post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <label>Image Link:</label>
        <input
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          onSubmit={(e) => setImages(images.push(e.target.value))}
        ></input>
      </form>
      <button onClick={handleSubmit}>Update blog</button>
    </div>
  );
}

export default EditBlog;
