import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { Table, Container, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import HomePagination from "../components/HomePagination";
import {
  listProducts,
  deleteProduct,
  createProduct,
  listProductDetails,
  updateProduct,
} from "../actions/productAction";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";

const ProductListPage = () => {
  const { pageNumber } = useParams() || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    product: productDetailsInfo,
  } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts("", pageNumber));
    } else {
      navigate("/login");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
    pageNumber,
  ]);

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      setShowCreateModal(false);
    }
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      setShowUpdateModal(false);
    } else {
      setName(productDetailsInfo.name);
      setPrice(productDetailsInfo.price);
      setImage(productDetailsInfo.image);
      setCategory(productDetailsInfo.category);
      setCountInStock(productDetailsInfo.countInStock);
      setDescription(productDetailsInfo.description);
    }
  }, [dispatch, productDetailsInfo, successUpdate]);

  const editHandler = (id) => {
    setShowUpdateModal(true);
    dispatch(listProductDetails(id));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // const uploadFileHandler = () => {};

  const submitCreateHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(name, price, image, category, countInStock, description)
    );
  };

  const submitUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productDetailsInfo._id,
        name,
        price,
        image,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <Container>
      <h1 className="profile-title ">List of Products</h1>

      <button
        className="mt-2 mb-3 btn-block"
        style={{ width: "20%" }}
        onClick={() => {
          setShowCreateModal(true);
        }}
      >
        <FaPlus /> Create New Product
      </button>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {!loading && products && (
        <>
          <Table bordered responsive className="table-sm admin-tables">
            <thead>
              <tr>
                <th>PRODUCT ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>IN STOCK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </td>
                  <td>€ {product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <button
                      variant="light"
                      className="btn-header"
                      onClick={() => editHandler(product._id)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      variant="danger"
                      className="btn-header "
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <HomePagination pages={pages} page={page} isAdmin={true} />
        </>
      )}

      <Modal
        show={showCreateModal}
        onHide={() => {
          setShowCreateModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="modal-title">Create New Product</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitCreateHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <input
                className="modal-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category:</Form.Label>
              <input
                className="modal-input"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <input
                className="modal-input"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <input
                className="modal-input"
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Images</Form.Label>
              <input
                className="modal-input"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <input
                className="modal-input"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </Form.Group>

            <button className="btn-block" type="submit">
              Create New Product
            </button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showUpdateModal}
        onHide={() => {
          setShowUpdateModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="modal-title">Update Product</h2>
            {loadingDetails && <Loader />}
            {errorDetails && <Message variant="danger">{errorDetails}</Message>}
          </Modal.Title>
        </Modal.Header>
        {productDetailsInfo && (
          <Modal.Body>
            <Form onSubmit={submitUpdateHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <input
                  className="modal-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category:</Form.Label>
                <input
                  className="modal-input"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <input
                  className="modal-input"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <input
                  className="modal-input"
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Images</Form.Label>
                <input
                  className="modal-input"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <input
                  className="modal-input"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </Form.Group>

              <button className="btn-block" type="submit">
                Update Product
              </button>
            </Form>
          </Modal.Body>
        )}
      </Modal>
    </Container>
  );
};

export default ProductListPage;
