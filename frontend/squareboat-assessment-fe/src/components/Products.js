import React from "react";
import { getAllProducts } from "../services/requests";
import { v4 } from "uuid";
import ProductCard from "./ProductCard";
import "../styles/Products.css";
import { useHistory } from "react-router-dom";
import { redirectToErrorPage } from "../services/redirects";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const history = useHistory();

  React.useEffect(
    () =>
      getAllProducts()
        .then((res) => {
          setProducts(res.data);
          console.log("products: ", res.data);
        })
        .catch((err) => {
          console.error("Error: Couldn't fetch products", err);
          redirectToErrorPage(history);
        }),
    []
  );
  return (
    <div id="all-products">
      {products.map((product) => {
        return (
          <li key={v4()}>
            <ProductCard
              product={product}
              disableAddToCart={{ value: false }}
            />
          </li>
        );
      })}
    </div>
  );
};

export default Products;
