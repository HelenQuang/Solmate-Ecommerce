import { useEffect, useState } from "react";
import { FaTimes, FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import { Table, Container, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listUsers,
  deleteUser,
  getUserDetails,
  updateUser,
} from "../actions/userAction";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    user: userDetailsInfo,
  } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      setShow(false);
    } else {
      setName(userDetailsInfo.name);
      setEmail(userDetailsInfo.email);
      setIsAdmin(userDetailsInfo.isAdmin);
    }
  }, [dispatch, successUpdate, userDetailsInfo]);

  const editHandler = (id) => {
    setShow(true);
    dispatch(getUserDetails(id));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userDetailsInfo._id, name, email, isAdmin }));
  };

  return (
    <Container>
      <h1 className="profile-title">List of Orders</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!loading && users && (
        <Table bordered responsive className="table-sm admin-tables">
          <thead>
            <tr>
              <th>USER ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <button
                    variant="light"
                    className="btn-header"
                    onClick={() => editHandler(user._id)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    variant="danger"
                    className="btn-header "
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal
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
      </Modal>
    </Container>
  );
};

export default OrderListPage;
