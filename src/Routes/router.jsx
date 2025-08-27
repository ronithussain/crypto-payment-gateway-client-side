import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts - এগুলো সাধারণত lazy load করা হয় না কারণ এগুলো প্রথমেই দরকার
import MainLayout from "../Layouts/MainLayout";
import DashBoard from "../Layouts/DashBoard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import FadeLoader from "react-spinners/FadeLoader";

// Loading Components
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <FadeLoader color="#12f4a3" height={12} margin={4} />
  </div>
);

const ComponentLoader = () => (
  <div>
    <div className="flex justify-center items-center min-h-screen">
      <FadeLoader color="#12f4a3" height={12} margin={4} />
    </div>
  </div>
);

// Lazy loaded components
// Main Pages
const Home = lazy(() => import("../Pages/Home/Home/Home"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage/ErrorPage"));
const Login = lazy(() => import("../Pages/AuthenticationPages/Login/Login"));
const Register = lazy(() => import("../Pages/AuthenticationPages/Register/Register"));
const About = lazy(() => import("../Components/About/About"));

// Dashboard User Routes
const AccountBalance = lazy(() => import("../Pages/Dashboards/UserRoutes/AccountBalance"));
const DepositWithdraw = lazy(() => import("../Pages/Dashboards/UserRoutes/DepositWithdraw"));
const TaskCenter = lazy(() => import("../Pages/Dashboards/UserRoutes/TaskCenter"));
const ReferralProgram = lazy(() => import("../Pages/Dashboards/UserRoutes/ReferralProgram"));

// Payment Pages
const USDTPage = lazy(() => import("../Pages/Dashboards/UserRoutes/Payment/USDTPage"));
const BitcoinPage = lazy(() => import("../Pages/Dashboards/UserRoutes/Payment/BitcoinPage"));
const EthereumPage = lazy(() => import("../Pages/Dashboards/UserRoutes/Payment/EthereumPage"));

// Admin Routes
const AdminProfile = lazy(() => import("../Pages/Dashboards/AdminRoutes/AdminProfile"));
const PendingTransactions = lazy(() => import("../Pages/Dashboards/AdminRoutes/PendingTransactions"));
const UserControl = lazy(() => import("../Pages/Dashboards/AdminRoutes/UserControl"));
// const AllUsers = lazy(() => import("../Pages/Dashboards/AdminRoutes/AllUsers"));

// Helper function to wrap components with Suspense
const withSuspense = (Component, loader = <ComponentLoader />) => (
  <Suspense fallback={loader}>
    <Component />
  </Suspense>
);

// Helper function for admin routes with Suspense
const withAdminRoute = (Component, loader = <ComponentLoader />) => (
  <AdminRoute>
    <Suspense fallback={loader}>
      <Component />
    </Suspense>
  </AdminRoute>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: withSuspense(ErrorPage, <PageLoader />),
    children: [
      {
        path: "/",
        element: withSuspense(Home, <PageLoader />)
      },
      {
        path: "/login",
        element: withSuspense(Login)
      },
      {
        path: "/register",
        element: withSuspense(Register)
      },
      {
        path: "/about",
        element: withSuspense(About)
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    errorElement: withSuspense(ErrorPage, <PageLoader />),
    children: [
      // User Routes with Suspense
      {
        path: "accountBalance",
        element: withSuspense(AccountBalance)
      },
      {
        path: "transaction",
        element: withSuspense(DepositWithdraw)
      },
      {
        path: "dailyProfitGenerator",
        element: withSuspense(TaskCenter)
      },
      {
        path: "referralProgram",
        element: withSuspense(ReferralProgram)
      },

      // Payment Pages with Suspense
      {
        path: "payment/bitcoin",
        element: withSuspense(BitcoinPage)
      },
      {
        path: "payment/usdt",
        element: withSuspense(USDTPage)
      },
      {
        path: "payment/ethereum",
        element: withSuspense(EthereumPage)
      },

      // Admin Routes with AdminRoute + Suspense
      {
        path: "adminProfile",
        element: withAdminRoute(AdminProfile)
      },
      {
        path: "pendingTransaction",
        element: withAdminRoute(PendingTransactions)
      },
      {
        path: "userControl",
        element: withAdminRoute(UserControl)
      },
      // { 
      //   path: "allUsers", 
      //   element: withAdminRoute(AllUsers) 
      // },
    ],
  },
]);

// Export lazy components for preloading if needed
export const lazyComponents = {
  Home,
  Login,
  Register,
  About,
  AccountBalance,
  DepositWithdraw,
  TaskCenter,
  ReferralProgram,
  USDTPage,
  BitcoinPage,
  EthereumPage,
  AdminProfile,
  PendingTransactions,
  UserControl,
};