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
    path: 'dashboard',
    element: <DashBoard></DashBoard>,
    children: [
      // {
      //   path: 'dashboardSecond',
      //   element: <DashboardSecond />
      // },
      {
        path: 'userProfile',
        element: <UserProfile></UserProfile>
      },
      // {
      //   path: 'myMovies',
      //   element: <MyMovies />
      // },
      // {
      //   path: 'allUsers',
      //   element: <AllUsers />,
      //   loader: () => fetch('https://assignment-10-server-side-tau.vercel.app/users')
      // }, {
      //   path: 'login',
      //   element: <Login />
      // },
      // {
      //   path: 'register',
      //   element: <Register />
      // }
    ]
  }
]);