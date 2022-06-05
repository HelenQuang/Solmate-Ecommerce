import React from "react";
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

  const earingDescription = (
    <h2 className="category-description">
      Expore our collection and find out timeless earings that establish the new
      classic.
    </h2>
  );
  const ringDescription = (
    <h2 className="category-description">
      Silver and diamond rings with minimal aesthetic and semiprecious stones. A
      new universe to combine, play and shine.
    </h2>
  );
  const necklaceDescription = (
    <h2 className="category-description">
      Discover our genuine necklaces collections in silver finishings. Real
      jewelry for real women.
    </h2>
  );
  const braceletDescription = (
    <h2 className="category-description">
      Our bracelets collections for women have avant-garde designs in silver
      finishings. Discover your new jewelry basics.
    </h2>
  );

  return (
    <>
      <h1 className="category-title">{paramCategory}</h1>
      {paramCategory === "bracelets" && braceletDescription}
      {paramCategory === "necklaces" && necklaceDescription}
      {paramCategory === "rings" && ringDescription}
      {paramCategory === "earings" && earingDescription}
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
