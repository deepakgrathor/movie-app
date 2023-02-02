import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, name, path }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
