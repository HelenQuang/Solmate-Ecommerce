import React from "react";
import products from "../components/products";
import Product from "../components/Product";
import Guarantee from "../components/Guarantee";

import { useParams } from "react-router-dom";
import { Row, Col, Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const paramCategory = category!.charAt(0).toUpperCase() + category!.slice(1);

  const product = products.filter((product) => product.category === category);

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
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>

        <Breadcrumb.Item active>{paramCategory}</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="category-title">{category}</h1>
      {category === "bracelets" && braceletDescription}
      {category === "necklaces" && necklaceDescription}
      {category === "rings" && ringDescription}
      {category === "earings" && earingDescription}
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
