import React from "react";
import { useHistory } from "react-router-dom";
import {
  redirectToErrorPage,
  redirectToHomePage,
  redirectToLoginPage,
} from "../services/redirects";
import { sendSignUpDetails } from "../services/requests";
import "../styles/Login.css";
import { UserContext } from "../UserContext";

const SignUp = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [doPasswordsMatch, setDoPasswordsMatch] = React.useState(true);

  const history = useHistory();

  React.useEffect(() => {
    comparePasswords();
  }, [confirmPassword, password]);

  const updateName = (e) => {
    setName(e);
  };

  const updateEmail = (e) => {
    setEmail(e);
  };

  const updatePassword = (e) => {
    setPassword(e);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e);
  };

  const comparePasswords = () => {
    const isSame = confirmPassword === password;

    if (!isSame) {
      setDoPasswordsMatch(false);
    } else {
      setDoPasswordsMatch(true);
    }
  };

  const userContext = React.useContext(UserContext);

  const getUser = () => {
    try {
      if (doPasswordsMatch) {
        sendSignUpDetails({ name, email, password })
          .then((res) => {
            if (res.status === 200) {
              const { _id, name, email, token } = res.data;
              userContext.setUser({
                _id: _id,
                name: name,
                email: email,
                token: token,
              });
              alert("Signed up successfully");
              redirectToHomePage(history);
            }
          })
          .catch((err) => {
            console.error("Error: Couldn't login", err);

            redirectToErrorPage(history);
          });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div id="login-form" className="card text-white bg-dark mb-3 row">
      {!doPasswordsMatch ? (
        <div className="alert alert-primary" role="alert">
          Passwords do not match
        </div>
      ) : null}
      <div className="row" id="input-div">
        <input
          className="form-control"
          type="last name"
          aria-label="default input example"
          placeholder="name"
          onChange={(e) => updateName(e.target.value)}
        />
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
          placeholder="password (at least 8 characters)"
          onChange={(e) => updatePassword(e.target.value)}
        />
        <input
          className="form-control"
          type="password"
          aria-label="default input example"
          placeholder="confirm password"
          onChange={(e) => updateConfirmPassword(e.target.value)}
        />
      </div>
      <div className="row">
        <button
          className="btn btn-primary col"
          type="button"
          onClick={() => redirectToLoginPage(history)}
        >
          Login
        </button>
        <button type="button" className="btn btn-light col" onClick={getUser}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
