import React, { useState } from "react";
import {
  Container,
  Breadcrumb,
  Form,
  Col,
  Row,
  ListGroup,
  Image,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { savePaymentMethod, saveShippingMethod } from "../actions/cartAction";

const PaymentPage = () => {
  let total;
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [shippingMethod, setShippingMethod] = useState("");

  const cart = useSelector((state) => state.cart);
  const { shippingInfo, cartItems } = cart;

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  if (!shippingMethod || shippingMethod === "0") {
    total = subtotal;
  } else {
    total = (+subtotal + 9.95).toFixed(2);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    dispatch(saveShippingMethod(shippingMethod));
  };

  return (
    <Container>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>

        <LinkContainer to="/cart">
          <Breadcrumb.Item>Cart</Breadcrumb.Item>
        </LinkContainer>

        <LinkContainer to="/shipping">
          <Breadcrumb.Item>Shipping</Breadcrumb.Item>
        </LinkContainer>

        <Breadcrumb.Item active>Payment</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mb-5">
        <Col>
          <h1 className="payment-title">Shipping Information</h1>
          <div className="confirm-shipping-info">
            <Col>
              <span>
                <strong>Fullname:</strong>
              </span>
              <span>{shippingInfo.fullname}</span>
            </Col>
            <Col>
              <span>
                <strong>Address:</strong>
              </span>
              <span>
                {shippingInfo.address}, {shippingInfo.postalCode},
                {shippingInfo.city}, {shippingInfo.country}
              </span>
            </Col>
            <Col>
              <span>
                <strong>Phone number:</strong>
              </span>
              <span>{shippingInfo.phone}</span>
            </Col>
          </div>

          <div className="payment-info">
            <h1 className="payment-title">Shipping Method</h1>
            <Form onSubmit={submitHandler} className="payment-form">
              <Form.Group>
                <Form.Label as="legend">Select Method:</Form.Label>
                <Col className="mb-1">
                  <Form.Check
                    type="radio"
                    label="Free standard shipping (7-10 working days) - Free"
                    id="standard"
                    name="shippingMethod"
                    value="0"
                    onChange={(e) => setShippingMethod(e.target.value)}
                  ></Form.Check>
                </Col>
                <Col className="mb-1">
                  <Form.Check
                    type="radio"
                    label="Express shipping (3-5 working days) - €9.95"
                    id="express"
                    name="shippingMethod"
                    value="9.95"
                    onChange={(e) => setShippingMethod(e.target.value)}
                  ></Form.Check>
                </Col>
              </Form.Group>
            </Form>
          </div>

          <div className="payment-info">
            <h1 className="payment-title">Payment Method</h1>
            <Form onSubmit={submitHandler} className="payment-form">
              <Form.Group>
                <Form.Label as="legend">Select Method:</Form.Label>
                <Col className="mb-2">
                  <Form.Check
                    type="radio"
                    label="PayPal or Credit Card"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
              </Form.Group>

              <button className="btn-block" type="submit">
                PLACE ORDER
              </button>
            </Form>
          </div>
        </Col>

        <Col className="separator-left">
          <ListGroup variant="flush">
            <h1 className="shipping-title">Order Details</h1>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="shipping-item-details">
                  <Col>
                    <LinkContainer to={`/products/id/${item.product}`}>
                      <Image
                        fluid
                        rounded
                        src={item.image[0]}
                        alt={item.name}
                        className="product-img"
                      />
                    </LinkContainer>
                    <div className="quantity-badge">{item.quantity}</div>
                  </Col>
                  <Col md={4}>
                    <strong>{item.name}</strong>
                  </Col>
                  <Col md={3}>€ {item.price}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="separator-top shipping-amount">
            <Row className="shipping-amount-details mt-4 mb-1">
              <Col md={3}>
                <strong>SUBTOTAL</strong>
              </Col>
              <Col md={3}>€ {subtotal}</Col>
            </Row>
            <Row className="shipping-amount-details mb-1">
              <Col md={3}>
                <strong>SHIPPING</strong>
              </Col>
              <Col md={3}>€ {shippingMethod}</Col>
            </Row>
            <Row className="shipping-amount-details mb-4">
              <Col md={3}>
                <strong>TOTAL</strong>
              </Col>
              <Col md={3}>€ {total}</Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
