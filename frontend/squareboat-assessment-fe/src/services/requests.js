import axios from "axios";

const dummyToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyeWFuLnNoYXJtYUBnbWFpbC5jb20iLCJfaWQiOiI2MTJiNjNkOWZiZDljYWUwZDU3YmExNDIiLCJpYXQiOjE2MzAyNjMzMzMsImV4cCI6MTYzMDI2NjkzM30.bt_uS_l-vg4aOtgHteheQlRcCLnappK53r0lNSjRCvQ";

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

export const getOrderDetails = (token, orderId) => {
  console.log("token: ", token);
  return axios.get(
    `http://localhost:8080/user/orders/${orderId}?token=${dummyToken}`
  );
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
