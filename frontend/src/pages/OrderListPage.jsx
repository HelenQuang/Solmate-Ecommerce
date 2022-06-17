import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Table, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAllOrders } from "../actions/orderAction";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListAll = useSelector((state) => state.orderListAll);
  const { loading, error, orders } = orderListAll;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Container>
      <h1 className="profile-title">List of Orders</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {orders && orders.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
          There is no order at the moment.
        </p>
      )}

      {orders && orders.length > 0 && (
        <Table bordered responsive className="table-sm admin-tables">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USERNAME</th>
              <th>USER EMAIL</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.user && order.user.email}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>€ {order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderListPage;
