import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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
            <NavDropdown title="Shop" id="navbarScrollingDropdown">
              <LinkContainer to="/shop/bracelets">
                <NavDropdown.Item>Bracelets</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/shop/earings">
                <NavDropdown.Item>Earings</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/shop/necklaces">
                <NavDropdown.Item>Necklaces</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/shop/rings">
                <NavDropdown.Item>Rings</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <Nav.Link href="/gift">Gift</Nav.Link>
            <Nav.Link href="/lookbook">Lookbook</Nav.Link>
            <Nav.Link href="/discover">Discover</Nav.Link>
          </Nav>
          <Navbar.Brand href="/">Solmate</Navbar.Brand>
          <Nav className="nav-right">
            <button type="button" className="btn-header">
              <IoSearchOutline />
            </button>

            <LinkContainer to="/wishlist">
              <button type="button" className="btn-header">
                <IoHeartOutline />
              </button>
            </LinkContainer>

            <LinkContainer to="/login">
              <button type="button" className="btn-header">
                <IoPersonOutline />
              </button>
            </LinkContainer>

            <LinkContainer to="/cart">
              <button type="button" className="btn-header">
                <IoCartOutline />
              </button>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
