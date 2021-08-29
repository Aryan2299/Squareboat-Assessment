import React from "react";
import { v4 } from "uuid";
import { getCart, getProducts } from "../services/requests";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [cart, setCart] = React.useState({});
  const [productsInCart, setProductsInCart] = React.useState([]);

  React.useEffect(
    () =>
      getCart()
        .then((res) => {
          setCart(res.data);
          console.log("cart", res.data);

          getProducts(res.data.products)
            .then((res) => setProductsInCart(res.data))
            .catch((err) =>
              console.error("Error: Couldn't fetch products", err)
            );
        })
        .catch((err) => console.error("Error: Couldn't fetch cart", err)),
    []
  );

  return (
    <div>
      {productsInCart.map((product) => {
        return (
          <li key={v4()}>
            <ProductCard product={product} disableAddToCart={true} />
          </li>
        );
      })}
    </div>
  );
};

export default Cart;

// { products: [{ _id: "612acdd1b3e47dd23893d171", quantity: 10 } ...]
//     _id: "612b9f3f2fa7e7fe538e5a2a",
// user: "612b63d9fbd9cae0d57ba142",
//  totalAmount: 1000
