import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  IoSearchOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoCartOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import CartPage from "../pages/CartPage";
import { logout } from "../actions/userAction";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" variant="light">
        <Container className="separator-bottom">
          <Nav className="nav-left">
            <NavDropdown title="Shop" id="shop">
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

            <button type="button" className="btn-header" onClick={handleShow}>
              <IoCartOutline />
            </button>

            {!userInfo && (
              <LinkContainer to="/login">
                <button type="button" className="btn-header">
                  <IoPersonOutline />
                </button>
              </LinkContainer>
            )}

            {userInfo && (
              <NavDropdown
                title={userInfo.name}
                id="username"
                className="username-dropdown"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Account</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <Offcanvas
              show={show}
              placement="end"
              scroll={true}
              backdrop={true}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                {/* <Offcanvas.Title>Shopping Cart</Offcanvas.Title> */}
              </Offcanvas.Header>
              <Offcanvas.Body>
                <CartPage />
              </Offcanvas.Body>
            </Offcanvas>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
