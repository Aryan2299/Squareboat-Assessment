import React from "react";
import { addToCart } from "../services/requests";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";
import {  redirectToLoginPage } from "../services/redirects";
import "../styles/ProductCard.css";

const ProductCard = (props) => {
  const { title, description, photo, pricePerUnit } = props.product;
  const { value, quantity } = props.disableAddToCart;

  const userContext = React.useContext(UserContext);
  const history = useHistory();

  return (
    <div id="product-card" className="card">
      <img className="card-img-top" src={photo} alt="thumbnail" />
      <div className="card-body">
        <h1 className="card-title">{title}</h1>
        <h2 className="card-text">{description}</h2>
        <p>INR {pricePerUnit}</p>
        {!value ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              addToCart(props.product, userContext.user.token)
                .then((res) => {
                  if (res.status === 200) {
                    alert("Added to cart");
                  }
                })
                .catch((err) => {
                  if (err.response.status === 401) {
                    redirectToLoginPage(history);
                  }
                })
            }
          >
            Add to Cart
          </button>
        ) : (
          <p>Quantity: {quantity}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
