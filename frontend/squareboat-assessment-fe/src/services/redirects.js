export const redirectToLoginPage = (history) => {
  history.push("/login");
};

export const redirectToSignUpPage = (history) => {
  history.push("/signup");
};

export const redirectToHomePage = (history) => {
  history.push("/");
};

export const redirectToOrdersPage = (history) => {
  history.push("/orders");
};

export const showOrderDetails = (orderId, history) => {
  history.push(`/orders/${orderId}`);
};

export const redirectToCart = (history) => {
  history.push("/cart");
};

export const redirectToErrorPage = (history) => {
  history.push("/error");
};
