import React from "react";
import { getAllOrders } from "../services/requests";
import { UserContext } from "../UserContext";

const Orders = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    getAllOrders()
      .then((res) => {
        const orderIds = res.data;
        
        console.log("orders: ", res.data);
      })
      .catch((err) => console.log("Error: Couldn't get orders", err));
  }, []);

  return <div></div>;
};

export default Orders;
