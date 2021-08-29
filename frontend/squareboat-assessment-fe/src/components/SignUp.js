import React from "react";
import { useHistory } from "react-router-dom";
import { redirectToLoginPage } from "../services/redirects";
import { sendSignUpDetails } from "../services/requests";
import "../styles/SignUp.css";
import { UserContext } from "../UserContext";
import ErrorAlert from "./ErrorAlert";

const SignUp = (props) => {
  //   const { emailMatcher, nameMatcher } = matcher;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showInvalidEmailMsg] = React.useState({
    value: false,
    message: "Please enter a valid email address ",
  });
  const [showPasswordsDoNotMatchMsg, setShowPasswordsDoNotMatchMsg] =
    React.useState({
      value: true,
      message: "Passwords do not match",
    });

  //   const user = useAuth(
  //     false,
  //     {
  //       name: { firstName: "John", lastName: "Doe" },
  //       email: "email@example.com",
  //       password: "password",
  //     },
  //     setShowInvalidEmailMsg,
  //     setShowPasswordsDoNotMatchMsg
  //   );
  //   const userContext = useContext(UserContext);

  const history = useHistory();

  const updateName = (e) => {
    setName(e);
  };

  const updateEmail = (e) => {
    setEmail(e);
  };

  const updatePassword = (e) => {
    setPassword(e);
  };

  const confirmPassword = (e) => {
    const isSame = e === password;

    if (!isSame) {
      setShowPasswordsDoNotMatchMsg(false);
    }
  };

  const userContext = React.useContext(UserContext);

  const getUser = () => {
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
          console.log("data: ", res.data);
        }
      })
      .catch((err) => console.error("Error: Couldn't login", err));
  };

  return (
    <div id="login-form" className="card text-white bg-dark mb-3 row">
      {showInvalidEmailMsg.value &&
      showPasswordsDoNotMatchMsg.value ? null : !showInvalidEmailMsg.value ? (
        <ErrorAlert errorMessage={showInvalidEmailMsg.message} />
      ) : (
        <ErrorAlert errorMessage={showPasswordsDoNotMatchMsg.message} />
      )}

      <input
        className="form-control"
        type="last name"
        aria-label="default input example"
        placeholder="text"
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
        placeholder="password"
        onChange={(e) => updatePassword(e.target.value)}
      />
      <input
        className="form-control"
        type="password"
        aria-label="default input example"
        placeholder="confirm password"
        onChange={(e) => confirmPassword(e.target.value)}
      />
      <div className="row">
        <button type="button" className="btn btn-light" onClick={getUser}>
          Sign Up
        </button>

        <button
          className="btn btn-primary col"
          type="button"
          onClick={() => redirectToLoginPage(history)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
