import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { either, isEmpty, isNil } from "ramda";
import { getFromLocalStorage } from "./utils/storage";

function App() {
  const jwtToken = getFromLocalStorage("jwtToken");
  const isLoggedIn = !either(isNil, isEmpty)(jwtToken);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/login" replace />
          }
        />
        {/* Catch-all: redirect unknown routes */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
