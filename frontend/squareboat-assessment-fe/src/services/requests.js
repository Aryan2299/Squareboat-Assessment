import axios from "axios";
import { backendUrl } from "../utils/constants";

export const sendLoginDetails = (payload) => {
  const { email, password } = payload;
  return axios.post(`${backendUrl}/auth/login`, {
    email,
    password,
  });
};

export const logoutUser = (userId) => {
  return axios.post(`${backendUrl}/auth/logout`, {
    userId,
  });
};

export const sendSignUpDetails = (payload) => {
  const { name, email, password } = payload;
  return axios.post(`${backendUrl}/auth/signup`, {
    name,
    email,
    password,
  });
};

export const getAllProducts = () => {
  return axios.get(`${backendUrl}/products`);
};

export const getAllOrders = (token) => {
  return axios.get(`${backendUrl}/user/orders?token=${token}`);
};

export const getOrderDetails = (token, orderId) => {
  return axios.get(`${backendUrl}/user/orders/${orderId}?token=${token}`);
};

export const getProducts = (productIds) => {
  return axios.post(`${backendUrl}/products/get`, { productIds });
};

export const getCart = (token) => {
  return axios.get(`${backendUrl}/user/cart?token=${token}`);
};

export const addToCart = (productId, token) => {
  return axios.post(`${backendUrl}/user/cart/add?token=${token}`, {
    productId,
  });
};

export const emptyCart = (token) => {
  return axios.get(`${backendUrl}/user/cart/empty?token=${token}`);
};

export const checkoutFromCart = (token) => {
  return axios.get(`${backendUrl}/user/cart/checkout?token=${token}`);
};
