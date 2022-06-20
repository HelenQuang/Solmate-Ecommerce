import { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Product from "../components/Product";
import Guarantee from "../components/Guarantee";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import HomePagination from "../components/HomePagination";
import ProductsCarousel from "../components/ProductsCarousel";
import { listProducts } from "../actions/productAction";

const HomePage = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Container>
      <Meta />

      {!keyword && <ProductsCarousel />}
      <h1>Our Latest Lookbook</h1>
      <p>
        Discover a piece of jewelry that resonates with you on a deeper level
      </p>

      {loading && <Loader />}
      {!loading && error && <Message variant="danger">{error}</Message>}
      {!loading && products && (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <HomePagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}

      <Guarantee />
    </Container>
  );
};

export default HomePage;
