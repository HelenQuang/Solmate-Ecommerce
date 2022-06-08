import { useEffect } from "react";
import Product from "../components/Product";
import Guarantee from "../components/Guarantee";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductCategory } from "../actions/productAction";

import { useParams } from "react-router-dom";
import { Row, Col, Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const productCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productCategory;

  useEffect(() => {
    dispatch(listProductCategory(category));
  }, [category, dispatch]);

  const earingDescription = (
    <h2 className="category-description">
      Expore our collection and find out timeless earings that establish the new
      classic.
    </h2>
  );
  const ringDescription = (
    <h2 className="category-description">
      Silver and diamond rings with minimal aesthetic and semiprecious stones. A
      new universe to combine, play and shine.
    </h2>
  );
  const necklaceDescription = (
    <h2 className="category-description">
      Discover our genuine necklaces collections in silver finishings. Real
      jewelry for real women.
    </h2>
  );
  const braceletDescription = (
    <h2 className="category-description">
      Our bracelets collections for women have avant-garde designs in silver
      finishings. Discover your new jewelry basics.
    </h2>
  );

  return (
    <>
      {loading && <Loader />}
      {loading && error && <Message variant="danger">{error}</Message>}
      {!loading && products && (
        <>
          <Breadcrumb>
            <LinkContainer to="/">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>

            <Breadcrumb.Item active>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="category-title">{category}</h1>

          {category === "bracelets" && braceletDescription}
          {category === "necklaces" && necklaceDescription}
          {category === "rings" && ringDescription}
          {category === "earings" && earingDescription}

          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Guarantee />
        </>
      )}
    </>
  );
};

export default CategoryPage;
