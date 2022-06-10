import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container>
      <Row className="justify-content-md-left mt-5">
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
