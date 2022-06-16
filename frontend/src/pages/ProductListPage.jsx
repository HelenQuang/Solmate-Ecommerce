import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { Table, Container, Form, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct } from "../actions/productAction";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const createProductHandler = () => {
    // dispatch(createProduct())
  };

  const editHandler = (id) => {
    // Edit
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <Container>
      <h1 className="profile-title ">List of Products</h1>

      <button
        className="mt-2 mb-3 btn-block"
        style={{ width: "20%" }}
        onClick={createProductHandler}
      >
        <FaPlus /> Create New Product
      </button>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {!loading && products && (
        <Table bordered responsive className="table-sm admin-tables">
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
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
      )}

      {/* <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="modal-title">Edit User Information</h2>
            {loadingDetails && <Loader />}
            {errorDetails && <Message variant="danger">{errorDetails}</Message>}
          </Modal.Title>
        </Modal.Header>
        {userDetailsInfo && (
          <Modal.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <input
                  className="login-input"
                  type="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="email">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="isadmin">
                <Form.Check
                  type="checkbox"
                  label="This user is admin"
                  checked={isAdmin}
                  className="my-4"
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <button className="btn-block" type="submit">
                Update User Information
              </button>
            </Form>
          </Modal.Body>
        )}
      </Modal> */}
    </Container>
  );
};

export default ProductListPage;
