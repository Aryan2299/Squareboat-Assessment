import React from "react";
import { useHistory } from "react-router-dom";
import { redirectToErrorPage } from "../services/redirects";
import { logoutUser } from "../services/requests";
import { UserContext } from "../UserContext";

const Logout = () => {
  const userContext = React.useContext(UserContext);
  const history = useHistory();
  return userContext.user.email ? (
    <button
      onClick={() =>
        logoutUser(userContext.user._id)
          .then((res) => console.log(res.data))
          .catch((err) => {
            console.error("Error: Couldn't logout user", err);
            redirectToErrorPage(history);
          })
      }
    >
      Logout
    </button>
  ) : null;
};
export default Logout;
