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
              <LinkContainer to="/products/category/bracelets">
                <NavDropdown.Item>Bracelets</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/products/category/earings">
                <NavDropdown.Item>Earings</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/products/category/necklaces">
                <NavDropdown.Item>Necklaces</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/products/category/rings">
                <NavDropdown.Item>Rings</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <LinkContainer to="/lookbook">
              <Nav.Link>Lookbook</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/discover">
              <Nav.Link>Discover</Nav.Link>
            </LinkContainer>
          </Nav>

          <LinkContainer to="/">
            <Navbar.Brand>Solmate</Navbar.Brand>
          </LinkContainer>

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
