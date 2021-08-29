import axios from "axios";
import React from "react";
import { signUpUser, validateSignUpDetails } from "../../services/authService";
import { UserContext } from "../../UserContext";
import bcrypt from "bcryptjs";

// use service for login as well, boolean arg to diff b/w login and sign up
export const useAuth = (
  forLogin = true,
  credentials = { name: "", email: "", password: "" },
  showInvalidEmailMsg,
  showPasswordsDoNotMatchMsg
) => {
  const { name, email, password } = credentials;
  const userContext = React.useContext(UserContext);

  const areDetailsValid = validateSignUpDetails(
    { firstName: name.firstName, lastName: name.lastName },
    email,
    password
  );

  if (forLogin) {
    // const res = await axios.post("http://localhost:8080")

    if (password === "passwod" && email === "email@example.com") {
      // userContext.name = "John Doe";
      // userContext.email = "email@example.com";

      return true;
    } else {
      return false;
    }
  } else {
    if (areDetailsValid === "valid") {
      // const res = await axios.post("http://localhost:8080");
      // userContext.name = "John Doe";
      // userContext.email = "email@example.com";
    } else {
      return false;
    }
  }
};
