import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaRegStar } from "react-icons/fa";

const Guarantee: React.FC = () => {
  return (
    <Row className="guarantee my-3 mx-0 ">
      <Col className="nav-left pt-2">
        <FaRegStar />
        <p className="mb-0">3 years warranty</p>
      </Col>
      <Col className="nav-left pt-2">
        <FaRegStar />
        <p>Free delivery</p>
      </Col>
      <Col className="pt-2">
        <FaRegStar />
        <p>30 days return</p>
      </Col>
    </Row>
  );
};

export default Guarantee;
