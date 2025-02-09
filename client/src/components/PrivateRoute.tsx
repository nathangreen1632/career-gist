import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("token"); // Check if user is logged in
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
