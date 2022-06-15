import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Container,
  Breadcrumb,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AiFillDelete } from "react-icons/ai";

import { addToCart, removeFromCart } from "../actions/cartAction";

const CartPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const quantity = new URLSearchParams(location.search).get("quantity");
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, +quantity));
    }
  }, [dispatch, id, quantity]);

  const removeCartHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const checkoutHandler = (e) => {
    e.preventDefault();
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <Container>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        <Breadcrumb.Item>Shipping</Breadcrumb.Item>
        <Breadcrumb.Item>Payment</Breadcrumb.Item>
        <Breadcrumb.Item>Order Confirmation</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="cart-title">Shopping Cart</h1>

      {!cartItems && (
        <div className="cart">
          <h4 className="cart-description">Your cart is currently empty.</h4>
          <LinkContainer to="/">
            <button className="cart-btn">Go Back</button>
          </LinkContainer>
        </div>
      )}

      {cartItems && (
        <Row>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="cart-item-details">
                  <Col md={2}>
                    <Image fluid rounded src={item.image[0]} alt={item.name} />
                  </Col>
                  <Col md={3} className="cart-item-name">
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
                  <Col md={2}>
                    <button
                      className="delete"
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
            <Row className="amount-details mt-4 mb-1">
              <Col md={4}>
                <strong>SUBTOTAL</strong>
              </Col>
              <Col md={3}>€ {subtotal}</Col>
            </Row>
            <Row className="amount-details mb-1">
              <Col md={4}>
                <strong>SHIPPING</strong>
              </Col>
              <Col md={3}>Calculated at next step</Col>
            </Row>
            <Row className="amount-details mb-4">
              <Col md={4}>
                <strong>TOTAL</strong>
              </Col>
              <Col md={3}>€ {subtotal}</Col>
            </Row>
            <Form onSubmit={checkoutHandler}>
              <Form.Check
                required
                type="checkbox"
                id="terms"
                label="I accept the terms and conditions, privacy policy and legal notice"
              />

              <button
                type="submit"
                className="cart-btn my-4"
                disabled={cartItems.length === 0}
              >
                CONTINUE TO SHIPPING
              </button>
            </Form>
          </div>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
