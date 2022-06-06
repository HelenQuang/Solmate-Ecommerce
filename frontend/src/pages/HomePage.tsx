import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Guarantee from "../components/Guarantee";
import { ProductInterface } from "../types/ProductInterface";

import { Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Our Latest Lookbook</h1>
      <p>
        Discover a piece of jewellery that resonates with you on a deeper level
      </p>
      {!products && <Spinner animation="grow" />}
      {products && (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
      <Guarantee />
    </>
  );
};

export default HomePage;
