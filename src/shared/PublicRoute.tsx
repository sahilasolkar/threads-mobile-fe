import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  return <>{!token ? children : <Navigate to={"/user/feed"} />}</>;
};

export default PublicRoute;
