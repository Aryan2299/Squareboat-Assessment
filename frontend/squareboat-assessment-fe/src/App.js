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

const USER_STATE = {
  user: {
    _id: null,
    name: null,
    email: null,
    token: null,
  },
  setUser: function (user) {
    this.user = user;
  },
};

function UserProvider({ children }) {
  return (
    <UserContext.Provider value={USER_STATE}>{children}</UserContext.Provider>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <nav
          id="navbar"
          className="navbar navbar-expand-lg navbar-light bg-light"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Home
            </a>
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
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login/Sign Up
                  </Link>
                </li>
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
                <li className="nav-item">
                  <Logout />
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
