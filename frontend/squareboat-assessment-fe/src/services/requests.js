import axios from "axios";
import { constants } from "../utils/constants";
import { validateEmail, validateSignUpDetails } from "./authService";

const { backendUrl } = constants;

export const sendLoginDetails = (payload) => {
  const { email, password } = payload;
  const isValidEmail = validateEmail(email);
  if (isValidEmail) {
    return axios.post(`${backendUrl}/auth/login`, {
      email,
      password,
    });
  }
  throw new Error("Invalid email.Please enter a valid email.");
};

export const logoutUser = (userId) => {
  return axios.post(`${backendUrl}/auth/logout`, {
    userId,
  });
};

export const sendSignUpDetails = (payload) => {
  const { name, email, password } = payload;
  const isValidUser = validateSignUpDetails(name, email, password);
  if (isValidUser) {
    return axios.post(`${backendUrl}/auth/signup`, {
      name,
      email,
      password,
    });
  }

  throw new Error(
    "Invalid input. Make sure password contains at least 8 characters and email is valid."
  );
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
