import React from "react";
import { Redirect } from "react-router-dom";
import { v4 } from "uuid";
import { addQuantitiesToProducts } from "../services/productService";
import { checkoutFromCart, getCart, getProducts } from "../services/requests";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [totalAmount, setTotalAmount] = React.useState();
  const [productsInCart, setProductsInCart] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(
    () =>
      getCart()
        .then((res) => {
          if (res.status === 200) {
            setTotalAmount(res.data.totalAmount);
            console.log("cart", res.data);

            console.log("prods: ", res.data.productIds);

            getProducts(res.data.productIds)
              .then((res) => {
                setProductsInCart(
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
          } else if (res.status === 409) {
          }
        })
        .catch((err) => console.error("Error: Couldn't fetch cart", err)),
    []
  );

  const emptyCart = () => {
    setProductsInCart([]);
    setTotalAmount(0);
  };

  const checkout = () => {
    checkoutFromCart()
      .then((res) => {
        console.log("checked out\n", res.data);
        emptyCart();
      })
      .catch((err) => console.error("Error: Couldn't checkout", err));
  };

  return !redirect ? (
    <div>
      <h1>Total: INR {totalAmount}</h1>
      <button type="button" onClick={emptyCart}>
        Empty Cart
      </button>
      {productsInCart.map((product) => {
        return (
          <li>
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
      <button type="button" onClick={checkout}>
        Checkout
      </button>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Cart;
