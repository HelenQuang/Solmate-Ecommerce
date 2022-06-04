import React from "react";
import { ProductInterface } from "../types/ProductInterface";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product: React.FC<{ product: ProductInterface }> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Title>
            <h4>{product.name}</h4>
          </Card.Title>
          <Card.Subtitle className="text-muted ">
            <h5>€{product.price}</h5>
          </Card.Subtitle>
          <Card.Subtitle className="text-muted ">
            <h6>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </h6>
          </Card.Subtitle>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
