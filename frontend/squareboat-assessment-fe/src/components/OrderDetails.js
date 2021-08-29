import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { addQuantitiesToProducts } from "../services/productService";
import { getOrderDetails, getProducts } from "../services/requests";
import ProductCard from "./ProductCard";

const OrderDetails = () => {
  const orderId = useParams();

  const [orderDetails, setOrderDetails] = React.useState({});
  const [productsOrdered, setProductsOrdered] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    getOrderDetails("orderId: ", orderId.id)
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
            .catch((err) =>
              console.error("Error: Couldn't fetch products", err)
            );
        } else if (res.status === 401) {
          setRedirect(true);
        }
      })
      .catch((err) =>
        console.error("Error: Couldn't fetch order details", err)
      );
    console.log("orderId: ", orderId.id);
  }, []);

  return !redirect ? (
    <div>
      <h1>{orderDetails._id}</h1>
      <h4>{orderDetails.orderedOn}</h4>
      <h6>{orderDetails.totalAmount}</h6>

      <ul>
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
  ) : (
    <Redirect to="/login" />
  );
};

export default OrderDetails;
