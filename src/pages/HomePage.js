import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import JumbotronBlog from '../components/JumbotronBlog';
import PaginationBar from '../components/PaginationBar';
import blogActions from '../redux/actions/blog.actions';
import SearchForm from '../components/SearchForm';
import BlogCard from '../components/BlogCard';

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const limit = 10;
  const blogs = useSelector((state) => state.blog.blogs);
  const loading = useSelector((state) => state.blog.loading);
  const totalPages = useSelector((state) => state.blog.totalPages);

  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogActions.getBlogs(pageNum, limit, query));
  }, [dispatch, pageNum, limit, query]);

  // Search
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
    setPageNum(1);
    setSearchInput('');
  };

  const shouldShowPagination = blogs.length > 0 && totalPages > 1 && !loading;

  return (
    <Container>
      {pageNum === 1 && <JumbotronBlog />}

      <Row>
        <Col>
          <SearchForm
            loading={loading}
            searchInput={searchInput}
            handleSearchChange={handleSearchInputChange}
            handleSubmit={handleSubmit}
          />

          {loading ? (
            <div className='text-center mt-5'>
              <ClipLoader color='#f86c6b' size={150} loading={true} />
            </div>
          ) : (
            <ul className='list-unstyled d-flex flex-wrap justify-content-between'>
              {blogs.map((b) => (
                <BlogCard key={b._id} blog={b} />
              ))}
            </ul>
          )}
        </Col>
      </Row>

      {shouldShowPagination && (
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPages}
        />
      )}
    </Container>
  );
};

export default HomePage;
