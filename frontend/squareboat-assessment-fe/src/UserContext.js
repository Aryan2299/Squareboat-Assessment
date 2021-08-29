import React, { createContext } from "react";

export function UserProvider(props) {
  const [user, setUser] = React.useState({
    _id: null,
    name: null,
    email: null,
    token: null,
  });

  const value = React.useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export const UserContext = createContext(null);
