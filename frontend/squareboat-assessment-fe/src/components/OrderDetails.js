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
    if (userContext.user.email === null) {
      redirectToLoginPage(history);
    }
    getOrderDetails(userContext.user.token, orderId.id)
      .then((res) => {
        if (res.status === 200) {
          setOrderDetails(res.data);
          console.log("order details: ", res.data);

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
        } else if (res.status === 401) {
          redirectToLoginPage(history);
        }
      })
      .catch((err) => {
        console.error("Error: Couldn't fetch order details", err);
        redirectToErrorPage(history);
      });
    console.log("orderId: ", orderId.id);
  }, [userContext, orderId]);

  return (
    <div>
      <h1>{orderDetails._id}</h1>
      <h4>{orderDetails.orderedOn}</h4>
      <h6>{orderDetails.totalAmount}</h6>

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
