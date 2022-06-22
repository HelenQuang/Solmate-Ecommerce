import React from "react";
import { ProductInterface } from "../types/ProductInterface";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const Product: React.FC<{ product: ProductInterface }> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <LinkContainer to={`/products/id/${product._id}`}>
        <Card.Img src={product.image[0]} variant="top" />
      </LinkContainer>
      <Card.Body>
        <Link to={`/products/id/${product._id}`}>
          <Card.Title>
            <h4>{product.name}</h4>
          </Card.Title>
          <Card.Subtitle className="text-muted ">
            <h5>€{product.price}</h5>
          </Card.Subtitle>
          <Card.Subtitle className="text-muted ">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Subtitle>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
