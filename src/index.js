import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import store from "./store";
import App from "./App";
import "./index.css";
//Screens
import ErrorPage from "./screens/Error";
import About from "./screens/About";
import Policy from "./screens/Policy";
import LoginScreen from "./screens/LoginScreen";

import RegistrationScreen from "./screens/RegistrationScreen";
import StudentListScreen from "./screens/StudentListScreen";
import BookingScreen from "./screens/BookingScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/registration",
    element: <RegistrationScreen />,
  },
  {
    path: "/studentList",
    element: <StudentListScreen />,
  },
  {
    path: "/bookingList",
    element: <BookingScreen />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/policy",
    element: <Policy />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
