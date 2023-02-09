import React from "react";
// For loading errors
const LoadError = React.memo(
  ({text}) => {
    return (
      <div className="row "  style={{
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div >
          <div className="alert alert-danger error-alert" role="alert">
            <div className="alert-heading d-inline">{text}</div>
          </div>
        </div>
      </div>
    );
  }
);
export default LoadError;
