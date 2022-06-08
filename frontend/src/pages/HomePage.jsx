import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Product from "../components/Product";
import Guarantee from "../components/Guarantee";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productAction";

const HomePage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Our Latest Lookbook</h1>
      <p>
        Discover a piece of jewelry that resonates with you on a deeper level
      </p>

      {loading && <Loader />}
      {!loading && error && <Message variant="danger">{error}</Message>}
      {!loading && products && (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      <Guarantee />
    </>
  );
};

export default HomePage;
