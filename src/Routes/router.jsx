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
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/about", element: <About /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      // User Routes
      { path: "accountBalance", element: <AccountBalance /> },
      { path: "transaction", element: <DepositWithdraw /> },
      { path: "dailyProfitGenerator", element: <DailyProfitGenerator /> },
      { path: "referralProgram", element: <ReferralProgram /> },

      // Payment Pages (Already inside PrivateRoute, no need to wrap again)
      { path: "payment/bitcoin", element: <BitcoinPage /> },
      { path: "payment/usdt", element: <USDTPage /> },
      { path: "payment/ethereum", element: <EthereumPage /> },

      // Admin Routes
      { path: "adminProfile", element: <AdminRoute><AdminProfile /></AdminRoute> },
      { path: "allUsers", element: <AdminRoute><AllUsers /></AdminRoute> },
      { path: "pendingTransaction", element: <AdminRoute><PendingTransactions /></AdminRoute> },
    ],
  },
]);