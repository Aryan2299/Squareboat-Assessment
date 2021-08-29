import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import React from "react";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Products from "./components/Products";
import OrderDetails from "./components/OrderDetails";
import { logoutUser } from "./services/requests";

function UserProvider({ children }) {
  const [user, setUser] = React.useState({
    id: null,
    name: null,
    email: null,
    token: null,
  });

  React.useEffect(() => {
    console.log("logged in user: ", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
              Home
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login/Sign Up
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/orders">
                    Orders
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/cart">
                    Cart
                  </a>
                </li>
                <li class="nav-item">
                  <button
                    onClick={() =>
                      logoutUser("612b63d9fbd9cae0d57ba142")
                        .then((res) => console.log(res.data))
                        .catch((err) =>
                          console.error("Error: Couldn't logout user", err)
                        )
                    }
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/orders/:id">
            <OrderDetails />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
