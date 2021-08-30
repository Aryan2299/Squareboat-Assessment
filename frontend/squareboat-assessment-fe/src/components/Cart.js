import React from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import { addQuantitiesToProducts } from "../services/productService";
import {
  redirectToErrorPage,
  redirectToLoginPage,
  redirectToOrdersPage,
} from "../services/redirects";
import {
  checkoutFromCart,
  emptyCart,
  getCart,
  getProducts,
} from "../services/requests";
import { UserContext } from "../UserContext";
import ProductCard from "./ProductCard";
import "../styles/Products.css";

const Cart = () => {
  const [totalAmount, setTotalAmount] = React.useState();
  const [productsInCart, setProductsInCart] = React.useState([]);

  const userContext = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    if (userContext.user.email === null) {
      redirectToLoginPage(history);
    }
    getCart(userContext.user.token)
      .then(async (res) => {
        if (res.status === 200) {
          setTotalAmount(res.data.totalAmount);

          await getProducts(res.data.productIds)
            .then((res) => {
              setProductsInCart(
                addQuantitiesToProducts(
                  res.data.productIdsWithQuantities,
                  res.data.products
                )
              );
            })
            .catch((err) => {
              console.error("Error: Couldn't fetch products", err);
            });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          redirectToLoginPage(history);
        }
        console.error("Error: Couldn't fetch cart", err);
      });
  }, [userContext]);

  const checkout = () => {
    checkoutFromCart(userContext.user.token)
      .then((res) => {
        if (res.status === 200) {
          alert(`Order placed successfully.\nOrder ID: ${res.data}`);
          redirectToOrdersPage(history);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            redirectToLoginPage(history);
          } else if (err.response.status === 409) {
            alert(err.response.data.error);
          }
        }
        console.error("Error: Couldn't checkout", err);
      });
  };

  return (
    <div id="all-products">
      <h1>Total: INR {totalAmount}</h1>
      <button
        type="button"
        onClick={() =>
          emptyCart(userContext.user.token)
            .then((res) => {
              if (res.status === 200) {
                setTotalAmount(0);
                setProductsInCart([]);
              }
            })
            .catch((err) => {
              console.error("Error: Couldn't empty cart", err);
              if (err.response.status === 401) {
                redirectToLoginPage(history);
              } else if (err.response.status === 500) {
                redirectToErrorPage(history);
              }
            })
        }
      >
        Empty Cart
      </button>
      {productsInCart.map((product) => {
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
      <button type="button" onClick={checkout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
