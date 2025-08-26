import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  ...props
}) => {
  if (!condition) {
    return <Navigate to={redirectRoute} replace />;
  }

  return <Route path={path} element={<Component {...props} />} />;
};

export default PrivateRoute;