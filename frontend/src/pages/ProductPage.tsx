import React from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../components/products";
import Product from "../components/Product";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  console.log(id);

  return <div></div>;
};

export default ProductPage;
