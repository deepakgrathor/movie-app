import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Layout/Header";
import MovieView from "./Pages/MovieView";
import Login from "./Pages/Login";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/show/:name"
          element={
            <PrivateRoute path="/show/:name">
              <MovieView />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
