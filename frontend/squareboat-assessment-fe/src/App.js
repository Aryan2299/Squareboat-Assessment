import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import React from "react";

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    user: {
      name: null,
      email: null,
    },
  });

  const userContext = React.useContext(UserContext);

  React.useEffect(() => console.log("user: ", userContext), [currentUser]);

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        {/* <nav className="navbar sticky-top navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand" aria-current="page">
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
            <div className="collapse navbar-collapse" id="navbarNav">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </nav> */}
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
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
