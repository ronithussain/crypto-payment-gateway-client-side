import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/AuthenticationPages/Login/Login";
import Register from "../Pages/AuthenticationPages/Register/Register";
import About from "../Components/About/About";
import PrivateRoute from "./PrivateRoute";

import DashBoard from "../Layouts/DashBoard";
import AllUsers from "../Pages/Dashboards/AdminRoutes/AllUsers";
import DepositWithdraw from "../Pages/Dashboards/UserRoutes/DepositWithdraw";
import AccountBalance from "../Pages/Dashboards/UserRoutes/AccountBalance";
import DailyProfitGenerator from "../Pages/Dashboards/UserRoutes/DailyProfitGenerator";
import ReferralProgram from "../Pages/Dashboards/UserRoutes/ReferralProgram";


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
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoard/></PrivateRoute>,
    children: [
      {
        path: 'allUsers',
        element: <AllUsers></AllUsers>
      },
      {
        index: true,
        element: <AccountBalance></AccountBalance>
      },
      {
        path: 'transaction',
        element: <DepositWithdraw></DepositWithdraw>
      },
      {
        path: 'dailyProfitGenerator',
        element: <DailyProfitGenerator></DailyProfitGenerator>
      },
      {
        path: 'referralProgram',
        element: <ReferralProgram></ReferralProgram>
      }
    ]
  }
]);