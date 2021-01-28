import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const BlogDetailPage = () => {
  const { id } = useParams();

  return (
    <Container className='BlogDetailPage'>
      <h1>Hello from Blog Detail Page for blog#{id}</h1>
    </Container>
  );
};

export default BlogDetailPage;
