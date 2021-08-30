import axios from "axios";

export const sendLoginDetails = (payload) => {
  const { email, password } = payload;
  return axios.post("http://localhost:8080/auth/login", {
    email,
    password,
  });
};

export const logoutUser = (userId) => {
  return axios.post("http://localhost:8080/auth/logout", {
    userId,
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
  return axios.get(`http://localhost:8080/user/orders?token=${token}`);
};

export const getOrderDetails = (token, orderId) => {
  console.log("token: ", token);
  return axios.get(
    `http://localhost:8080/user/orders/${orderId}?token=${token}`
  );
};

export const getProducts = (productIds) => {
  return axios.post("http://localhost:8080/products/get", { productIds });
};

export const getCart = (token) => {
  return axios.get(`http://localhost:8080/user/cart?token=${token}`);
};

export const addToCart = (productId, token) => {
  return axios.post(`http://localhost:8080/user/cart/add?token=${token}`, {
    productId,
  });
};

export const emptyCart = (token) => {
  return axios.get(`http://localhost:8080/user/cart/empty?token=${token}`);
};

export const checkoutFromCart = (token) => {
  return axios.get(`http://localhost:8080/user/cart/checkout?token=${token}`);
};
