import axios from "axios";

const dummyToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwiX2lkIjoiNjEyYWI5Y2U4YWIwZGFjNjQ0YTJkZWVhIiwiaWF0IjoxNjMwMjUyMzE0LCJleHAiOjE2MzAyNTU5MTR9.6y8ygf_v_ncQXSTSyUoavDvomqE-2YA_frMAmadg8CI";

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

export const addToCart = (payload, quantity) => {
  return axios.post(`http://localhost:8080/user/cart/add?token=${dummyToken}`, {
    incomingProduct: { ...payload, quantity },
  });
};

export const checkoutFromCart = (token) => {
  return axios.get(
    `http://localhost:8080/user/cart/checkout?token=${dummyToken}`
  );
};
