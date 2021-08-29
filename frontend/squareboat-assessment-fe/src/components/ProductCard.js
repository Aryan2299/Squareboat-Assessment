import React from "react";
import { addToCart } from "../services/requests";
import "../styles/ProductCard.css";

const ProductCard = (props) => {
  const { _id, title, description, photo, pricePerUnit } = props.product;
  const { value, quantity } = props.disableAddToCart;

  return (
    <div>
      <img src={photo} />
      <h1>{title}</h1>
      <h2>{description}</h2>
      <p>INR {pricePerUnit}</p>
      {!value ? (
        <button
          type="button"
          onClick={() =>
            addToCart(props.product)
              .then((resp) => console.log("resp: ", resp.data))
              .catch((err) =>
                console.error("Error: Coulddn't add to cart", err)
              )
          }
        >
          Add to Cart
        </button>
      ) : (
        <p>Quantity: {quantity}</p>
      )}
    </div>
  );
};

export default ProductCard;
