import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import { FaHeart } from "react-icons/fa";
import { TbRotateClockwise } from "react-icons/tb";
import { IoAirplaneOutline, IoDiamondOutline } from "react-icons/io5";
import { RiLock2Line } from "react-icons/ri";

import Rating from "../components/Rating";
import {
  listProductDetails,
  createProductReview,
  addProductToWishlist,
} from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [heartColor, setHeartColor] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productWishlist = useSelector((state) => state.productWishlist);
  const { wishlist } = productWishlist;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
    loading: loadingProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== id) {
      dispatch(listProductDetails(id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    const existProduct = wishlist.find((x) => x._id === product._id);

    if (existProduct) {
      setHeartColor("red");
    } else {
      setHeartColor("black");
    }
  }, [dispatch, id, product._id, successProductReview, wishlist]);

  const likedHandler = () => {
    dispatch(addProductToWishlist(product));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <Container>
      {loading && <Loader />}
      {!loading && error && <Message variant="danger">{error}</Message>}
      {!loading && product._id && (
        <>
          <Meta title={product.name} />
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
                  <FaHeart
                    className="heart-icon"
                    style={{ fill: `${heartColor}` }}
                    onClick={likedHandler}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4> € {product.price}</h4>
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
                    onClick={() => {
                      navigate(`/cart/${id}?quantity=${quantity}`);
                    }}
                  >
                    ADD TO CART
                  </button>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup className="separator-bottom">
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

              <h2 className="review-title">Customer Reviews:</h2>

              {product.reviews.length === 0 && (
                <p className="review-text" style={{ fontStyle: "italic" }}>
                  Do you want to share your experience with this product? Feel
                  free to write a review!
                </p>
              )}

              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <p
                      className="review-text mt-3"
                      style={{ fontSize: "1.2rem" }}
                    >
                      <strong>{review.name}</strong>
                    </p>
                    <Rating value={review.rating} />
                    <p className="review-text">
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p
                      className="review-text separator-bottom pb-3"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {review.comment}
                    </p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2 className="review-title">Write Your Review:</h2>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label
                          className="review-text mt-3"
                          style={{ fontSize: "1.2rem" }}
                        >
                          Add rating:
                        </Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="review-text"
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Average</option>
                          <option value="4">4 - Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label
                          className="review-text mt-3"
                          style={{ fontSize: "1.2rem" }}
                        >
                          Write comment:
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row="5"
                          value={comment}
                          className="review-text"
                          onChange={(e) => setComment(e.target.value)}
                          style={{ textAlign: "left" }}
                        ></Form.Control>
                      </Form.Group>

                      <button
                        disabled={loadingProductReview}
                        type="submit"
                        className="btn-block mt-4 mb-5"
                        style={{ width: "30%" }}
                      >
                        Submit
                      </button>
                    </Form>
                  ) : (
                    <p style={{ fontStyle: "italic" }} className="review-text">
                      Please <Link to="/login">sign in</Link> to write a review!
                    </p>
                  )}
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
