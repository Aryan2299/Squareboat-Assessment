import React from "react";
import { useHistory } from "react-router-dom";
import { redirectToLoginPage } from "../services/redirects";
import { logoutUser } from "../services/requests";
import { UserContext } from "../UserContext";

const Logout = () => {
  const userContext = React.useContext(UserContext);
  const history = useHistory();

  return userContext.user.email !== null ? (
    <button
      onClick={() =>
        logoutUser(userContext.user._id)
          .then((res) => {
            console.log(res.data);
            userContext.user = {
              _id: null,
              name: null,
              email: null,
              token: null,
            };
            redirectToLoginPage(history);
          })
          .catch((err) => console.error("Error: Couldn't logout user", err))
      }
    >
      Logout
    </button>
  ) : null;
};
export default Logout;
