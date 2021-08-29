import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { sendSignUpDetails } from "../services/requests";
import "../styles/SignUp.css";
import { UserContext } from "../UserContext";
import ErrorAlert from "./ErrorAlert";

const SignUp = (props) => {
  //   const { emailMatcher, nameMatcher } = matcher;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [showInvalidEmailMsg, setShowInvalidEmailMsg] = React.useState({
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

  const redirectToLoginPage = () => {
    history.push("/login");
  };

  let userContext = React.useContext(UserContext);

  const getUser = () => {
    sendSignUpDetails({ name, email, password })
      .then((resp) => {
        if (resp.status === 200) {
          userContext = resp.data;
          console.log("data: ", resp.data);
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
      <div classNameName="row">
        <button
          type="button"
          className="btn btn-light"
          //   onClick={() => {
          //     console.log(user);
          //     console.log(userContext);
          //   }}
          onClick={getUser}
        >
          Sign Up
        </button>

        <button
          className="btn btn-primary col"
          type="button"
          onClick={redirectToLoginPage}
        >
          Login
        </button>

        {redirect ? <Redirect to="/" /> : null}
      </div>
    </div>
  );
};

export default SignUp;
