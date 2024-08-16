import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AquamarinePage from "./pages/AquamarinePage.jsx";
import AquamarineRoomPage from "./pages/AquamarineRoomPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RoomBooked from "./components/RoomBooked.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ThanksPage from "./pages/ThanksPage.jsx";
import FindRoomPage from "./pages/FindRoomPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";

const router = createBrowserRouter([
  //array of objects
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register-page",
    element: <RegisterPage />,
  },
  {
    path: "/login-page",
    element: <LoginPage />,
  },
  {
    path: "/home-page",
    element: <HomePage />,
  },
  {
    path: "/aquamarine-page",
    element: <AquamarinePage />,
  },
  {
    path: "/aquamarine-room-page",
    element: <AquamarineRoomPage />,
  },
  {
    path: "/room-booked-page",
    element: <RoomBooked />,
  },
  {
    path: "/thanks-page",
    element: <ThanksPage />,
  },
  {
    path: "/find-room-page",
    element: <FindRoomPage />,
  },
  {
    path: "/forgot-password-page",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
