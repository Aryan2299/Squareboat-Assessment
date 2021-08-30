import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  redirectToErrorPage,
  redirectToHomePage,
  redirectToSignUpPage,
} from "../services/redirects";
import { sendLoginDetails } from "../services/requests";
import "../styles/Login.css";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const updateEmail = (e) => {
    setEmail(e);
  };

  const updatePassword = (e) => {
    setPassword(e);
  };

  const userContext = React.useContext(UserContext);
  const history = useHistory();

  const loginUser = () => {
    sendLoginDetails({ email: email, password: password })
      .then((res) => {
        if (res.status === 200) {
          const { _id, name, email, token } = res.data;
          console.log("user: ", res.data);
          userContext.setUser({
            _id: _id,
            name: name,
            email: email,
            token: token,
          });
          redirectToHomePage(history);
        }
      })
      .catch((err) => {
        console.error("Error: Couldn't login", err);
        redirectToErrorPage(history);
      });
  };

  return (
    <div id="login-form" className="card text-white bg-dark mb-3 row">
      <input
        className="form-control"
        type="email"
        aria-label="default input example"
        placeholder="email"
        onChange={(e) => updateEmail(e.target.value)}
      />

      <input
        className="form-control"
        type="password"
        aria-label="default input example"
        placeholder="password"
        onChange={(e) => updatePassword(e.target.value)}
      />
      <div ame="row">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => redirectToSignUpPage(history)}
        >
          Sign Up
        </button>

        <button
          className="btn btn-primary col"
          type="button"
          onClick={loginUser}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
