import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Col, Row, Form, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { addToCart, removeFromCart } from "../actions/cartAction";

const CartOverlays = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeCartHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  const shipping = subtotal > 50 ? 0 : 10;

  const total = (+subtotal + shipping).toFixed(2);

  return (
    <>
      {cartItems.length === 0 && (
        <div className="cart">
          <h4 className="cart-description">Your cart is currently empty.</h4>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="cart-item-details">
                  <Col md={3}>
                    <Image fluid rounded src={item.image[0]} alt={item.name} />
                  </Col>
                  <Col md={3}>
                    <LinkContainer to={`/products/id/${item.product}`}>
                      <strong>{item.name}</strong>
                    </LinkContainer>
                  </Col>
                  <Col md={2}>€{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <button
                      className="clear-btn"
                      onClick={() => {
                        removeCartHandler(item.product);
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="separator-top">
            <Row className="cart-item-details mt-4 mb-1">
              <Col md={4}>
                <strong>SUBTOTAL</strong>
              </Col>
              <Col md={3}>€ {subtotal}</Col>
            </Row>
            <Row className="cart-item-details mb-1">
              <Col md={4}>
                <strong>SHIPPING</strong>
              </Col>
              <Col md={3}>€ {shipping}</Col>
            </Row>
            <Row className="cart-item-details mb-4">
              <Col md={4}>
                <strong>TOTAL</strong>
              </Col>
              <Col md={3}>€ {total}</Col>
            </Row>
            <button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={() => {
                navigate("/login?redirect=shipping");
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CartOverlays;
