import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  IoSearchOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoCartOutline,
} from "react-icons/io5";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="light" variant="light">
        <Container className="separator-bottom">
          <Nav className="nav-left">
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="/gift">Gift</Nav.Link>
            <Nav.Link href="/lookbook">Lookbook</Nav.Link>
            <Nav.Link href="/discover">Discover</Nav.Link>
          </Nav>
          <Navbar.Brand href="/">Solmate</Navbar.Brand>
          <Nav className="nav-right">
            <button type="button" className="btn-header">
              <IoSearchOutline />
            </button>
            <button type="button" className="btn-header">
              <IoHeartOutline />
            </button>
            <button type="button" className="btn-header">
              <IoPersonOutline />
            </button>
            <button type="button" className="btn-header">
              <IoCartOutline />
            </button>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
