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
  Card,
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

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
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
      </Breadcrumb>

      <h1 className="cart-title">Shopping Cart</h1>

      {!id && (
        <div className="cart">
          <h4 className="cart-description">Your cart is currently empty.</h4>
          <LinkContainer to="/">
            <button className="cart-btn">Go Back</button>
          </LinkContainer>
        </div>
      )}

      {id && (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="cart-item-details">
                    <Col md={3}>
                      <Image
                        fluid
                        rounded
                        src={item.image[0]}
                        alt={item.name}
                      />
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
          </Col>
          <Col md={4}>
            <Card className="cart-card">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>Total items: {totalItems}</h5>
                  <h5>Subtotal price: € {subtotal}</h5>
                  <h5>Shipping fee: € {subtotal}</h5>
                  <h5>Total price: € {subtotal}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
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
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
