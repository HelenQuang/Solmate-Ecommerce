import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
  return (
    <div>
      <Spinner
        animation="grow"
        role="status"
        style={{
          width: "30px",
          height: "30px",
          margin: "auto",
        }}
      />
      <Spinner
        animation="grow"
        role="status"
        style={{
          width: "30px",
          height: "30px",
          margin: "auto",
        }}
      />
      <Spinner
        animation="grow"
        role="status"
        style={{
          width: "30px",
          height: "30px",
          margin: "auto",
        }}
      />
    </div>
  );
};

export default Loader;
