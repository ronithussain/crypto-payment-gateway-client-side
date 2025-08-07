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

import AdminProfile from "../Pages/Dashboards/AdminRoutes/AdminProfile";
import AdminRoute from "./AdminRoute";
import USDTPage from "../Pages/Dashboards/UserRoutes/Payment/USDTPage";
import BitcoinPage from "../Pages/Dashboards/UserRoutes/Payment/BitcoinPage";
import EthereumPage from "../Pages/Dashboards/UserRoutes/Payment/EthereumPage";
import PendingTransactions from "../Pages/Dashboards/AdminRoutes/PendingTransactions";


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
        element: <About />
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoard /></PrivateRoute>,
    children: [
      {
        path: 'accountBalance',
        element: <PrivateRoute><AccountBalance /></PrivateRoute>
      },
      {
        path: 'transaction',
        element: <PrivateRoute><DepositWithdraw /></PrivateRoute>
      },
      {
        path: 'dailyProfitGenerator',
        element: <PrivateRoute><DailyProfitGenerator /></PrivateRoute>
      },
      {
        path: 'referralProgram',
        element: <PrivateRoute><ReferralProgram /></PrivateRoute>
      },

      // ✅ Payment pages inside dashboard
      {
        path: 'payment/bitcoin',
        element: <PrivateRoute><BitcoinPage /></PrivateRoute>
      },
      {
        path: 'payment/usdt',
        element: <PrivateRoute><USDTPage /></PrivateRoute>
      },
      {
        path: 'payment/ethereum',
        element: <PrivateRoute><EthereumPage /></PrivateRoute>
      },


      // admin all routes_________________________________________________:
      {
        path: 'adminProfile',
        element: <AdminRoute><AdminProfile /></AdminRoute>
      },
      {
        path: 'allUsers',
        element: <AdminRoute><AllUsers /></AdminRoute>
      },
      {
        path: 'pendingTransaction',
        element: <AdminRoute><PendingTransactions/></AdminRoute>
      },

    ]
  }
]);