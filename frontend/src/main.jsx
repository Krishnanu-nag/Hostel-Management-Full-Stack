import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AquamarinePage from './pages/AquamarinePage.jsx';
import AquamarineRoomPage from './pages/AquamarineRoomPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';



const router=createBrowserRouter([    //array of objects
  {
    path:"/",
    element:<LandingPage/>
  },
  {
    path:"/register-page",
    element:<RegisterPage/>
  },
  {
    path:"/login-page",
    element:<LoginPage/>
  },
  {
    path:"/home-page",
    element:<HomePage/>
  },
  {
    path:"/aquamarine-page",
    element:<AquamarinePage/>
  },
  {
    path:"/aquamarine-room-page",
    element:<AquamarineRoomPage/>
  },

  

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
