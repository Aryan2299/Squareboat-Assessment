import React from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import {
  redirectToErrorPage,
  redirectToLoginPage,
  showOrderDetails,
} from "../services/redirects";
import { getAllOrders } from "../services/requests";
import { UserContext } from "../UserContext";
import "../styles/Orders.css";
import "../styles/Miscellaneous.css";

const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [hasNoOrders, setHasNoOrders] = React.useState(false);

  const userContext = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    getAllOrders(userContext.user.token)
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data);
          if (res.data.length < 1) {
            setHasNoOrders(true);
          }
        }
      })
      .catch((err) => {
        console.error("Error: Couldn't get orders", err);
        if (err.response.status === 401) {
          redirectToLoginPage(history);
        } else if (err.response.status === 500) {
          redirectToErrorPage(history);
        }
      });
  }, [userContext]);

  return hasNoOrders ? (
    <div id="empty-response-div">
      <h2>No orders yet</h2>
    </div>
  ) : (
    <div id="orders-div">
      {orders.map((order) => {
        return (
          <li
            className="order-card card-body"
            key={v4()}
            onClick={() => showOrderDetails(order._id, history)}
          >
            <h2 className="card-title">Order ID: {order._id}</h2>
            <h4 className="card-subtitle mb-2 text-muted">
              Ordered on: {new Date(order.orderedOn).toDateString()}
            </h4>
          </li>
        );
      })}
    </div>
  );
};

export default Orders;
