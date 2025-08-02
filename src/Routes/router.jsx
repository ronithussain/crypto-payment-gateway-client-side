import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/AuthenticationPages/Login/Login";
import Register from "../Pages/AuthenticationPages/Register/Register";
import About from "../Components/About/About";
import Contact from "../Components/Contact/Contact";
import PrivateRoute from "./PrivateRoute";

import DashBoard from "../Layouts/DashBoard";
import UserProfile from "../Pages/Dashboards/UserRoutes/UserProfile";
import Admin from "../Pages/Dashboards/AdminRoutes/Admin";
import AllUsers from "../Pages/Dashboards/AdminRoutes/AllUsers";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/about',
        element: <PrivateRoute><About /></PrivateRoute>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoard/></PrivateRoute>,
    children: [
      {
        path: 'allUsers',
        element: <AllUsers></AllUsers>
      }
    ]
  }
]);