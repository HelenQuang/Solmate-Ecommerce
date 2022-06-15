import React, { useState } from "react";
import {
  Col,
  Form,
  Breadcrumb,
  Container,
  ListGroup,
  Row,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import { saveShippingInfo } from "../actions/cartAction";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingInfo } = cart;

  const [fullname, setFullname] = useState(shippingInfo.fullname);
  const [address, setAddress] = useState(shippingInfo.address);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [city, setCity] = useState(shippingInfo.city);
  const [country, setCountry] = useState(shippingInfo.country);
  const [phone, setPhone] = useState(shippingInfo.phone);

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ fullname, address, postalCode, city, country, phone })
    );
    navigate("/payment");
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
        <Breadcrumb.Item active>Shipping</Breadcrumb.Item>
        <Breadcrumb.Item>Payment</Breadcrumb.Item>
        <Breadcrumb.Item>Order Confirmation</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mb-5">
        <Col className="shipping-info">
          <h1 className="shipping-title">Shipping Information</h1>

          <Form onSubmit={submitHandler} className="shipping-form">
            <Form.Group controlId="email">
              <input
                className="login-input"
                type="fullname"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="address">
              <input
                className="login-input"
                type="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="postalCode">
              <input
                className="login-input"
                type="postalCode"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="city">
              <input
                className="login-input"
                type="city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="country">
              <input
                className="login-input "
                type="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="phone">
              <input
                className="login-input lastchild"
                type="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Save this information for next purchase"
              />
            </Form.Group>

            <button className="btn-block" type="submit">
              CONTINUE
            </button>
          </Form>
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
                  <Col md={3}>€{item.price}</Col>
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
              <Col md={3}>Calculated at next step</Col>
            </Row>
            <Row className="shipping-amount-details mb-4">
              <Col md={3}>
                <strong>TOTAL</strong>
              </Col>
              <Col md={3}>€ {subtotal}</Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingPage;
