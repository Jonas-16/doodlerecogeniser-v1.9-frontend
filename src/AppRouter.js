// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";   // your login page component
import Signin from "./Signin"; // your signup page component
import App from "./App";       // doodle app you shared

function AppRouter() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={isLoggedIn ? <App /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
