import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { addQuantitiesToProducts } from "../services/productService";
import {
  redirectToLoginPage,
  redirectToErrorPage,
} from "../services/redirects";
import { getOrderDetails, getProducts } from "../services/requests";
import { UserContext } from "../UserContext";
import ProductCard from "./ProductCard";
import "../styles/Products.css";
import "../styles/ProductCard.css";

const OrderDetails = () => {
  const orderId = useParams();

  const [orderDetails, setOrderDetails] = React.useState({});
  const [productsOrdered, setProductsOrdered] = React.useState([]);

  const userContext = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    getOrderDetails(userContext.user.token, orderId.id)
      .then((res) => {
        if (res.status === 200) {
          setOrderDetails(res.data);

          getProducts(res.data.productIds)
            .then((res) => {
              setProductsOrdered(
                addQuantitiesToProducts(
                  res.data.productIdsWithQuantities,
                  res.data.products
                )
              );
            })
            .catch((err) => {
              console.error("Error: Couldn't fetch products", err);
              redirectToErrorPage(history);
            });
        }
      })
      .catch((err) => {
        console.error("Error: Couldn't fetch order details", err);
        if (err.response.status === 401) {
          redirectToLoginPage(history);
        } else if (err.response.status === 500) {
          redirectToErrorPage(history);
        }
      });
  }, [userContext, orderId]);

  return (
    <div style={{ marginTop: "25vh", textAlign: "center" }}>
      <h1>Order ID: {orderDetails._id}</h1>
      <h4>Ordered on: {new Date(orderDetails.orderedOn).toDateString()}</h4>
      <h4>Total Amount: INR {orderDetails.totalAmount}</h4>

      <ul id="all-products">
        {productsOrdered.map((product) => {
          return (
            <li key={v4()}>
              <ProductCard
                product={product}
                disableAddToCart={{
                  value: true,
                  quantity: product.quantity,
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderDetails;
