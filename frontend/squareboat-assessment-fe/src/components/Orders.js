import React from "react";
import { getAllOrders } from "../services/requests";
import { UserContext } from "../UserContext";

const Orders = () => {
  const userContext = React.useContext(UserContext);
  const { token } = userContext.user;

  React.useEffect(
    () =>
      getAllOrders(token)
        .then((resp) => console.log("orders: ", resp.data))
        .catch((err) => console.log("Error: Couldn't get orders", err)),
    []
  );

  return <div></div>;
};

export default Orders;
