import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Row, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import JumbotronBlog from "../components/JumbotronBlog";
import PaginationBar from "../components/PaginationBar";
import blogActions from "../redux/actions/blog.actions";
import SearchForm from "../components/SearchForm";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const limit = 10;
  const blogs = useSelector((state) => state.blog.blogs);
  const loading = useSelector((state) => state.blog.loading);
  const totalPages = useSelector((state) => state.blog.totalPages);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // Search
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
    setSearchInput("");
  };

  useEffect(() => {
    dispatch(blogActions.getBlogs(pageNum, limit, query));
  }, [dispatch, pageNum, limit, query]);

  const addDefaultSrc = (e) => {
    e.target.src = "https://media.giphy.com/media/l2JJDrvnFUEboRgSQ/giphy.gif";
  };
  return (
    <Container>
      <JumbotronBlog />
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPages}
      />
      <Row>
        <Col>
          <SearchForm
            loading={loading}
            searchInput={searchInput}
            handleSearchChange={handleSearchInputChange}
            handleSubmit={handleSubmit}
          />
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#f86c6b" size={150} loading={true} />
            </div>
          ) : (
            <ul className="list-unstyled d-flex flex-wrap justify-content-between">
              {blogs.map((b) => (
                <li key={b._id}>
                  <Link to={`/blogs/${b._id}`}>
                    <Card
                      style={{
                        width: "18rem",
                        marginBottom: "2rem",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          b.images.length > 0
                            ? b.images[0]
                            : "https://media.giphy.com/media/l2JJDrvnFUEboRgSQ/giphy.gif"
                        }
                        onError={addDefaultSrc}
                      />
                      <Card.Body>
                        <Card.Title>{b.title}</Card.Title>
                        <Card.Text>{b.content}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        @{b.author.name} wrote{" "}
                        <Moment fromNow>{b.createdAt}</Moment>
                      </Card.Footer>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
