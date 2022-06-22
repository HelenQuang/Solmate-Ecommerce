import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import {
  IoSearchOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoCartOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import SearchBox from "./SearchBox";
import CartOffCanvas from "./CartOffCanvas";
import { logout } from "../actions/userAction";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      <Navbar bg="light" variant="light">
        <Container className="separator-bottom">
          <Nav>
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

            {!showSearch && (
              <button
                type="button"
                className="btn-header"
                onClick={() => setShowSearch(true)}
              >
                <IoSearchOutline />
              </button>
            )}

            {showSearch && <SearchBox />}
          </Nav>

          <LinkContainer to="/">
            <Navbar.Brand>Solmate</Navbar.Brand>
          </LinkContainer>

          <Nav className="justify-content-end">
            <LinkContainer to="/wishlist">
              <button type="button" className="btn-header">
                <IoHeartOutline />
              </button>
            </LinkContainer>

            <button
              type="button"
              className="btn-header"
              onClick={() => setShowCart(true)}
            >
              <IoCartOutline />
            </button>

            {!userInfo && (
              <LinkContainer to="/login">
                <button type="button" className="btn-header">
                  <IoPersonOutline />
                </button>
              </LinkContainer>
            )}

            {userInfo && !userInfo.isAdmin && (
              <NavDropdown
                title={userInfo.name}
                id="username"
                className="username-dropdown"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Account</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown
                title="Admin"
                id="admin"
                className="username-dropdown"
              >
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users List</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products List</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders List</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <CartOffCanvas
              showCart={showCart}
              setShowCart={setShowCart}
              totalItems={totalItems}
            />
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
