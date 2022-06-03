import React from "react";
import { ProductInterface } from "../types/ProductInterface";

import { Card } from "react-bootstrap";

const Product: React.FC<{ product: ProductInterface }> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>
      <Card.Body>
        <a href={`product/${product._id}`}>
          <Card.Title>
            <h4>{product.name}</h4>
          </Card.Title>
          <Card.Subtitle className="text-muted ">
            <h5>€{product.price}</h5>
          </Card.Subtitle>
        </a>
      </Card.Body>
    </Card>
  );
};

export default Product;
