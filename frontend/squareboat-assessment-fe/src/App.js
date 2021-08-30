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
import Logout from "./components/Logout";
import ErrorPage from "./components/ErrorPage";

function UserProvider({ children }) {
  const [user, setUser] = React.useState({
    user: {
      _id: null,
      name: null,
      email: null,
      token: null,
    },
  });
  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <nav
          id="navbar"
          className="navbar navbar-expand-lg navbar-dark bg-primary"
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <UserContext.Consumer>
              {(value) => (
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/orders">
                        Orders
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">
                        Cart
                      </Link>
                    </li>
                    {!value.user.email ? (
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">
                          Login/Sign Up
                        </Link>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <Logout />
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </UserContext.Consumer>
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
          <Route path="/error">
            <ErrorPage />
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
