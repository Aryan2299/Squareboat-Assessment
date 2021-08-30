import React from "react";
import { useHistory } from "react-router-dom";
import { redirectToHomePage } from "../services/redirects";
import "../styles/ErrorPage.css";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div id="error-message" className="card">
      <h3 className="card-title">Somehting went wrong.</h3>
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => redirectToHomePage(history)}
        >
          Go to homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
