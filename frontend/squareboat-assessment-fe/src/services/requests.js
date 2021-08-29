import axios from "axios";

const dummyToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyeWFuLnNoYXJtYUBnbWFpbC5jb20iLCJfaWQiOiI2MTJiNjNkOWZiZDljYWUwZDU3YmExNDIiLCJpYXQiOjE2MzAyNTYwNjAsImV4cCI6MTYzMDI1OTY2MH0.sC1qx97jvNfgBZjMmPlx664WTG-qSPdpEBq1hPlCROU";

export const sendLoginDetails = (payload) => {
  const { email, password } = payload;
  return axios.post("http://localhost:8080/auth/login", {
    email,
    password,
  });
};

export const sendSignUpDetails = (payload) => {
  const { name, email, password } = payload;
  return axios.post("http://localhost:8080/auth/signup", {
    name,
    email,
    password,
  });
};

export const getAllProducts = () => {
  return axios.get("http://localhost:8080/products");
};

export const getAllOrders = (token) => {
  console.log("token: ", token);
  return axios.get(`http://localhost:8080/user/orders?token=${dummyToken}`);
};

export const getProducts = (productIds) => {
  return axios.post("http://localhost:8080/products/get", { productIds });
};

export const getCart = (token) => {
  return axios.get(`http://localhost:8080/user/cart?token=${dummyToken}`);
};

export const addToCart = (productId) => {
  return axios.post(`http://localhost:8080/user/cart/add?token=${dummyToken}`, {
    productId,
  });
};

export const checkoutFromCart = (token) => {
  return axios.get(
    `http://localhost:8080/user/cart/checkout?token=${dummyToken}`
  );
};
