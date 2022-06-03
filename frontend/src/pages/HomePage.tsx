import React from "react";
import products from "../components/products";
import Product from "../components/Product";
import Guarantee from "../components/Guarantee";

import { Row, Col } from "react-bootstrap";

const HomePage: React.FC = () => {
  return (
    <>
      <h1>Our Latest Lookbook</h1>
      <p>
        Discover a piece of jewellery that resonates with you on a deeper level
      </p>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Guarantee />
    </>
  );
};

export default HomePage;
