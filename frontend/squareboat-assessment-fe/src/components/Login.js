import axios from "axios";
import React from "react";
import { Link, Redirect, Router, useHistory } from "react-router-dom";
import { sendLoginDetails } from "../services/requests";
import "../styles/Login.css";
import { UserContext } from "../UserContext";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  const history = useHistory();

  const updateEmail = (e) => {
    setEmail(e);
  };

  const updatePassword = (e) => {
    setPassword(e);
  };

  const redirectToSignUpPage = () => {
    history.push("/signup");
  };

  let userContext = React.useContext(UserContext);

  const loginUser = () => {
    sendLoginDetails({ email: email, password: password })
      .then((resp) => {
        if (resp.status === 200) {
          const { _id, name, email, token } = resp.data;
          userContext.setUser({
            id: _id,
            name: name,
            email: email,
            token: token,
          });
          setRedirect(true);
        }
      })
      .catch((err) => console.error("Error: Couldn't login", err));
  };

  React.useEffect(() => console.log("user: ", userContext), [userContext]);
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
      <div classNameName="row">
        <button
          type="button"
          className="btn btn-light"
          onClick={redirectToSignUpPage}
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

        {redirect ? <Redirect to="/" /> : null}
      </div>
    </div>
  );
};

export default Login;
