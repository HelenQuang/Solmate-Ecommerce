import React, { useState } from "react";
import products from "../components/products";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Guarantee from "../components/Guarantee";

const CategoryPage: React.FC = () => {
  const params = useParams();
  const paramCategory = params.category;

  const product = products.filter(
    (product) => product.category === paramCategory
  );

  return (
    <>
      <h1>
        {paramCategory!.charAt(0).toUpperCase() + paramCategory!.slice(1)}
      </h1>
      <Row>
        {product.map((product) => (
          <Col key={product._id} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Guarantee />
    </>
  );
};

export default CategoryPage;
