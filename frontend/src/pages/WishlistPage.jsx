import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import Product from "../components/Product";
import Guarantee from "../components/Guarantee";

const WishlistPage = () => {
  const productWishlist = useSelector((state) => state.productWishlist);
  const { wishlist } = productWishlist;

  return (
    <Container>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>

        <Breadcrumb.Item active>Wishlist</Breadcrumb.Item>
      </Breadcrumb>

      <h1>Your Wishlist</h1>

      {wishlist.length === 0 && <p>Your wishlist is currently empty!</p>}

      {wishlist.length > 0 && (
        <Row>
          {wishlist.map((product) => (
            <Col key={product._id} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      <Guarantee />
    </Container>
  );
};

export default WishlistPage;
