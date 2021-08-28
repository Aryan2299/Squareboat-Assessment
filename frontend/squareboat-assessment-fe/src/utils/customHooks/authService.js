import axios from "axios";
import React from "react";
import { signUpUser, validateSignUpDetails } from "../../services/authService";
import { UserContext } from "../../UserContext";

export const useAuthService = (
  credentials = { name: "", email: "", password: "" },
  showInvalidEmailMsg,
  showPasswordsDoNotMatchMsg
) => {
  const { name, email, password } = credentials;
  const userContext = React.useContext(UserContext);

  const user = validateSignUpDetails(
    { firstName: name.firstName, lastName: name.lastName },
    email,
    password
  );

  if (user === "valid") {
    // const res = await axios.post("http://localhost:8080");
    userContext.name = "John Doe";
    userContext.email = "email@example.com";
  }

  return user;
};
