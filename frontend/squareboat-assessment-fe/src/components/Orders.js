import React from "react";
import { useHistory } from "react-router-dom";
import { getAllOrders } from "../services/requests";
import { UserContext } from "../UserContext";

const Orders = () => {
  const history = useHistory();
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    getAllOrders()
      .then((res) => {
        setOrders(res.data);
        console.log("orders: ", res.data);
      })
      .catch((err) => console.log("Error: Couldn't get orders", err));
  }, []);

  const showOrderDetails = (orderId) => {
    history.push(`/orders/${orderId}`);
  };

  return (
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
  );
};

export default Orders;

// _id: "612bca48036d80146ba00cbf"
// ​
// orderedBy: "612b63d9fbd9cae0d57ba142"
// ​
// orderedOn: "2021-08-29T17:56:24.212Z"
// ​
// productIds: Array(5) [ "612acdd1b3e47dd23893d171", "612b6dab488dfbe72872999a", "612bc73f56bc2c12650ac8e5", … ]
// ​
// totalAmount: 950
