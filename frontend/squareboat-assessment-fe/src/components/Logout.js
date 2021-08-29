import React from "react";
import { logoutUser } from "../services/requests";
import { UserContext } from "../UserContext";

const Logout = () => {
  const userContext = React.useContext(UserContext);
  return userContext.user.email ? (
    <button
      onClick={() =>
        logoutUser(userContext.user._id)
          .then((res) => console.log(res.data))
          .catch((err) => console.error("Error: Couldn't logout user", err))
      }
    >
      Logout
    </button>
  ) : null;
};
export default Logout;
