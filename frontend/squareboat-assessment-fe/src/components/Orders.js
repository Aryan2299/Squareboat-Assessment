import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getAllOrders } from "../services/requests";
import { UserContext } from "../UserContext";

const Orders = () => {
  const history = useHistory();
  const [orders, setOrders] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);

  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    console.log("userContext", userContext);
    getAllOrders(userContext.user.token)
      .then((res) => {
        console.log("response: ", res);
        if (res.status === 200) {
          setOrders(res.data);
          console.log("orders: ", res.data);
        } else if (res.status === 401) {
          setRedirect(true);
        }
      })
      .catch((err) => console.log("Error: Couldn't get orders", err));
  }, []);

  const showOrderDetails = (orderId) => {
    history.push(`/orders/${orderId}`);
  };

  return !redirect ? (
    <div>
      <h1>
        {orders.map((order) => {
          return (
            <li onClick={() => showOrderDetails(order._id)}>
              <h2>{order._id}</h2>
              <h4>{order.orderedOn}</h4>
            </li>
          );
        })}
      </h1>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Orders;
