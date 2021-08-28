import React from "react";
import { Link, Redirect, Router, useHistory } from "react-router-dom";
import "../styles/Login.css";

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

        <button className="btn btn-primary col" type="button">
          Login
        </button>

        {redirect ? <Redirect to="/" /> : null}
      </div>
    </div>
  );
};

export default Login;
