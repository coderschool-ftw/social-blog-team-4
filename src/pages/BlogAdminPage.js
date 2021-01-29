import React from "react";
import MenuAdmin from "../components/MenuAdmin";
import { Row, Col } from "react-bootstrap";

const BlogAdminPage = () => {
  return (
    <>
      <Row>
        <Col md={2}>
          <MenuAdmin />
        </Col>
        <Col md={9}>
          <h2>Blog Manage</h2>
        </Col>
      </Row>
    </>
  );
};

export default BlogAdminPage;
