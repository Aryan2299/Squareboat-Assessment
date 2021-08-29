import React from "react";
import { getAllProducts, getProducts } from "../services/requests";
import "../styles/Products.css";
import { v4 } from "uuid";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(
    () =>
      getAllProducts()
        .then((res) => {
          setProducts(res.data);
          console.log("products: ", res.data);
        })
        .catch((err) => console.error("Error: Couldn't fetch products", err)),
    []
  );
  return (
    <div>
      {products.map((product) => {
        return <ProductCard product={product} disableAddToCart={false} />;
      })}
    </div>
  );
};

export default Products;
