import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Breadcrumb,
  Tab,
  Tabs,
  Carousel,
  Form,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BsSuitHeart } from "react-icons/bs";
import { TbRotateClockwise } from "react-icons/tb";
import { IoAirplaneOutline, IoDiamondOutline } from "react-icons/io5";
import { RiLock2Line } from "react-icons/ri";

import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?quantity=${quantity}`);
  };

  return (
    <Container>
      {loading && <Loader />}
      {!loading && error && <Message variant="danger">{error}</Message>}
      {!loading && product._id && (
        <>
          <Breadcrumb>
            <LinkContainer to="/">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>

            <LinkContainer to={`/products/category/${product.category}`}>
              <Breadcrumb.Item>
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </Breadcrumb.Item>
            </LinkContainer>

            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
          </Breadcrumb>

          <Row>
            <Col md={5}>
              <Carousel>
                {product.image.map((imgSrc) => (
                  <Carousel.Item key={imgSrc}>
                    <img
                      src={imgSrc}
                      alt="Product slideshow"
                      className="product-img"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            <Col md={5}>
              <ListGroup variant="flush" className="separator-bottom">
                <ListGroup.Item>
                  <h1>{product.name}</h1>
                  <BsSuitHeart className="heart-icon" />
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4> €{product.price}</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
              </ListGroup>

              <ListGroup variant="flush" className="separator-bottom">
                <ListGroup.Item>
                  <ul className="extra-info">
                    <li className="extra-info-li">
                      <TbRotateClockwise className="extra-info-icon" />
                      30 DAYS FOR EXCHANGES AND RETURNS
                    </li>
                    <li className="extra-info-li">
                      <IoAirplaneOutline className="extra-info-icon" />
                      FREE SHIPPING WORLDWIDE
                    </li>
                    <li className="extra-info-li">
                      <RiLock2Line className="extra-info-icon" />3 YEARS
                      WARRANTY
                    </li>
                    <li className="extra-info-li">
                      <IoDiamondOutline className="extra-info-icon" />
                      HAND-FINISHED JEWELRY WITH PREMIUM MATERIALS
                    </li>
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <ul className="extra-info">
                      <li className="extra-info-li">
                        <Col>Status: </Col>
                        <Col>
                          <strong>
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out Of Stock"}
                          </strong>
                        </Col>
                      </li>

                      {product.countInStock > 0 && (
                        <li className="extra-info-li">
                          <Col>Quantity:</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </li>
                      )}
                    </ul>
                  </Row>

                  <button
                    className="btn-block"
                    type="submit"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    ADD TO CART
                  </button>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup>
                <ListGroup.Item>
                  <Tabs
                    defaultActiveKey="story"
                    className="mb-2 extra-info-tabs"
                  >
                    <Tab
                      eventKey="story"
                      title="Story"
                      className="mb-2 extra-info-tabs"
                    >
                      <p>
                        An idealistic escape. An imagined vision of a parallel
                        world. Nostalgia and imagination walk hand in hand to
                        create a new visual language. You are invited to an
                        intrepid exploration with playfulness and
                        experimentation as a premise. Forget about the
                        constraints of time and embark on a whimsical quest.
                      </p>
                    </Tab>
                    <Tab
                      eventKey="specs"
                      title="Specs"
                      className="mb-2 extra-info-tabs"
                    >
                      <p>
                        Pointe A provides one-of-a-kind colored gemstones in
                        delicate doses. Designed to satisfy even the most
                        minimal of minimalists, these pieces will bring your
                        jewelry look up to date in a flash. Even better, this
                        collection is always limited edition, special and 100%
                        ethically earth-mined. Quantities are determined by the
                        number of stones we can source, all are set in solid
                        gold and no two pieces are ever exactly alike. We may
                        have expensive taste, but crazy mark-ups aren't really
                        our thing. By focusing on quality that matters, we just
                        give you the good stuff.
                      </p>
                    </Tab>
                    <Tab
                      eventKey="material"
                      title="Material"
                      className="mb-2 extra-info-tabs"
                    >
                      <p>
                        Like an intriguing intersection of past and future, this
                        product blends retro-futuristic motifs with contemporary
                        elements. Geometric shapes mesh with staple elements to
                        create a jewelry piece envisioned to level up any
                        outfit. Made of 925 Sterling Silver, this design will
                        make you want to break the rules and play around.
                      </p>
                    </Tab>
                  </Tabs>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductPage;
