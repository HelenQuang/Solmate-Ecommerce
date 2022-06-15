import { useEffect } from "react";
import {
  Container,
  Breadcrumb,
  Col,
  Row,
  ListGroup,
  Image,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails } from "../actions/orderAction";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, order]);

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

        <LinkContainer to="/payment">
          <Breadcrumb.Item>Payment</Breadcrumb.Item>
        </LinkContainer>

        <Breadcrumb.Item active>Order Confirmation</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {!loading && order && (
        <Row className="mb-5">
          <Col>
            <h1 className="shipping-title">Order Information</h1>
            <div className="confirm-shipping-info">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Fullname:</strong> {order.shippingInfo.fullname}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingInfo.address},{" "}
                {order.shippingInfo.postalCode}, {order.shippingInfo.city},{" "}
                {order.shippingInfo.country}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Phone number:</strong> {order.shippingInfo.phone}
              </p>
              <p>
                <strong>Shipping method:</strong>{" "}
                {order.shippingMethod === "0"
                  ? "Free standard delivery"
                  : "Express delivery"}
              </p>
              {order.isDelivered ? (
                <div>
                  <Message variant="success">
                    Order is delivered at {order.deliveredAt}
                  </Message>
                </div>
              ) : (
                <div>
                  <Message variant="warning">Order is not delivered</Message>
                </div>
              )}

              <p>
                <strong>Payment method:</strong> {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <div>
                  <Message variant="success">
                    Order is paid at {order.paidAt}
                  </Message>
                </div>
              ) : (
                <div>
                  <Message variant="warning">Order is not paid</Message>
                </div>
              )}
            </div>
          </Col>

          <Col className="separator-left">
            <ListGroup variant="flush">
              <h1 className="shipping-title">Order Summary</h1>
              {order.orderItems.map((item) => (
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
                <Col md={3}>€ {order.subtotalPrice}</Col>
              </Row>
              <Row className="shipping-amount-details mb-1">
                <Col md={3}>
                  <strong>SHIPPING</strong>
                </Col>
                <Col md={3}>€ {order.shippingMethod}</Col>
              </Row>
              <Row className="shipping-amount-details mb-4">
                <Col md={3}>
                  <strong>TOTAL</strong>
                </Col>
                <Col md={3}>€ {order.totalPrice}</Col>
              </Row>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderPage;
