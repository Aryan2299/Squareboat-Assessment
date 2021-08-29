import React from "react";
import { v4 } from "uuid";
import { checkoutFromCart, getCart, getProducts } from "../services/requests";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [totalAmount, setTotalAmount] = React.useState();
  const [productsInCart, setProductsInCart] = React.useState([]);

  React.useEffect(
    () =>
      getCart()
        .then((res) => {
          setTotalAmount(res.data.totalAmount);
          console.log("cart", res.data);

          console.log("prods: ", res.data.productIds);

          getProducts(res.data.productIds)
            .then((res) => {
              setProductsInCart(res.data);
              console.log("products in cart ", res.data);
            })
            .catch((err) =>
              console.error("Error: Couldn't fetch products", err)
            );
        })
        .catch((err) => console.error("Error: Couldn't fetch cart", err)),
    []
  );

  const checkout = () => {
    checkoutFromCart()
      .then((res) => console.log("checked out\n", res.data))
      .catch((err) => console.error("Error: Couldn't checkout", err));
  };

  return (
    <div>
      <h1>Total: INR {totalAmount}</h1>
      {productsInCart.map((product) => {
        return (
          <li key={v4()}>
            <ProductCard product={product} disableAddToCart={true} />
          </li>
        );
      })}
      <button type="button" onClick={checkout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;

// { products: [{ _id: "612acdd1b3e47dd23893d171", quantity: 10 } ...]
//     _id: "612b9f3f2fa7e7fe538e5a2a",
// user: "612b63d9fbd9cae0d57ba142",
//  totalAmount: 1000
