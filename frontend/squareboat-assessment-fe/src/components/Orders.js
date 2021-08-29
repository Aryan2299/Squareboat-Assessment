import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { redirectToLoginPage, showOrderDetails } from "../services/redirects";
import { getAllOrders } from "../services/requests";
import { UserContext } from "../UserContext";
// import "../styles/Products.css";
// import "../styles/ProductCards.css";

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
      .catch((err) => console.log("Error: Couldn't get orders", err));
  }, [userContext]);

  // const showOrderDetails = (orderId, history) => {
  //   history.push(`/orders/${orderId}`);
  // };

  return (
    <div id="all-products">
      <h1>
        {orders.map((order) => {
          return (
            <li onClick={() => showOrderDetails(order._id, history)}>
              <h2>{order._id}</h2>
              <h4>{order.orderedOn}</h4>
            </li>
          );
        })}
      </h1>
    </div>
  );
};

export default Orders;
