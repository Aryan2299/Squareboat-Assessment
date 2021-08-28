import React from "react";

const ErrorAlert = (props) => {
  return (
    <div class="alert alert-primary" role="alert">
      {props.errorMessage}
    </div>
  );
};

export default ErrorAlert;
