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
import Features from "../Components/Features/Features";


 export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path: "/",
            element: <Home/>
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
            path: "/features",
            element: <Features></Features>
        },
         {
            path: '/about',
            element: <About></About>,
        },
        {
            path: '/contact',
            element: <Contact></Contact>
        },
    ]
  },
]);