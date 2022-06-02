import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="light" variant="light">
        <Container className="separator-bottom">
          <Nav className="me-auto">
            <Nav.Link href="#shop">Shop</Nav.Link>
            <Nav.Link href="#gift">Gift</Nav.Link>
            <Nav.Link href="#lookbook">Lookbook</Nav.Link>
            <Nav.Link href="#lookbook">Discover</Nav.Link>
          </Nav>
          <Navbar.Brand href="#home">Solmate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#shop">Shop</Nav.Link>
            <Nav.Link href="#gift">Gift</Nav.Link>
            <Nav.Link href="#lookbook">Lookbook</Nav.Link>
            <Nav.Link href="#lookbook">Discover</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
