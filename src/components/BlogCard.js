import React from "react";
import Moment from "react-moment";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const addDefaultSrc = (e) => {
    e.target.src = "https://media.giphy.com/media/l2JJDrvnFUEboRgSQ/giphy.gif";
  };

  const imgSrc =
    blog.images && blog.images.length > 0
      ? blog.images[0]
      : "https://media.giphy.com/media/l2JJDrvnFUEboRgSQ/giphy.gif";

  return (
    <li>
      <Link
        to={`/blogs/${blog._id}`}
        className='text-reset text-decoration-none'
      >
        <Card
          style={{
            width: "18rem",
            marginBottom: "2rem",
          }}
        >
          <Card.Img variant='top' src={imgSrc} onError={addDefaultSrc} />
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>{blog.content.substring(0, 100)}</Card.Text>
          </Card.Body>
          <Card.Footer className='text-muted'>
            @{blog.author.name} wrote <Moment fromNow>{blog.createdAt}</Moment>
          </Card.Footer>
        </Card>
      </Link>
    </li>
  );
};

export default BlogCard;
