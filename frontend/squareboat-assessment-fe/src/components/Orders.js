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

const Orders = () => {
  const [orders, setOrders] = React.useState([]);

  const userContext = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    console.log("userContext", userContext);
    if (userContext.user.email === null) {
      redirectToLoginPage(history);
    }
    getAllOrders(userContext.user.token)
      .then((res) => {
        console.log("response: ", res);
        if (res.status === 200) {
          setOrders(res.data);
          console.log("orders: ", res.data);
        } else if (res.status === 401) {
          redirectToLoginPage(history);
        }
      })
      .catch((err) => {
        console.log("Error: Couldn't get orders", err);
      });
  }, [userContext]);

  return (
    <div>
      <ul id="orders-div">
        {orders.map((order) => {
          return (
            <li
              className="order-card card-body"
              key={v4()}
              onClick={() => showOrderDetails(order._id, history)}
            >
              <h2 className="card-title">Order ID: {order._id}</h2>
              <h4 className="card-subtitle mb-2 text-muted">
                Ordered on: {order.orderedOn}
              </h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Orders;
