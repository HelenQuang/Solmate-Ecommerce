import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const ProductsCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!loading && products && (
        <Carousel fade pause="hover" className="product-carousel">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/products/id/${product._id}`}>
                <img
                  className="d-block product-carousel-img"
                  src={product.image[0]}
                  alt={product.name}
                />
                <Carousel.Caption>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductsCarousel;
