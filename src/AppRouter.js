// src/AppRouter.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signin from "./Signin";
import App from "./App";
import { AuthContext } from "./AuthContext";

function AppRouter() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/" element={isLoggedIn ? <App /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
