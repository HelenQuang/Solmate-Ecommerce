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
import { useParams, useNavigate } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderAction";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, navigate, order, successDeliver, successPay, userInfo]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    });
  };

  const successPaymentHandler = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(payOrder(id, details));
    });
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
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
                    Order is delivered on {order.deliveredAt.substring(0, 10)}
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
                    Thank you for your payment. Order is paid on{" "}
                    {order.paidAt.substring(0, 10)}
                  </Message>
                </div>
              ) : (
                <div>
                  <Message variant="warning">Order is not paid</Message>
                </div>
              )}

              {loadingPay && <Loader />}
              {isPending && <Loader />}
              {isRejected && (
                <Message variant="danger">SDK loading error</Message>
              )}
              {isResolved && (
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={successPaymentHandler}
                  className="paypal-btn"
                />
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
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <button
                    type="button"
                    className="btn-block"
                    onClick={deliverHandler}
                  >
                    MARK AS DELIVERED
                  </button>
                )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderPage;
