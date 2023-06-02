import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Register from './views/Register';
/** */
import InfoStudentForAdmin from "../src/views/Dashboard/InfoStudentForAdmin";
import QuanLyBang from "../src/views/Dashboard/QuanLyBang";
import QuanLyKhachHangMoi from "../src/views/Dashboard/NewCustomer";
import MainLayoutAdmin from '../src/views/Dashboard/MainLayoutAdmin';
/** */
import InfoStudent  from './views/InfoStudent';
import Logins from './views/Logins';
import Register_Advise  from './views/Register_advise';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/advise",
    element: <Register_Advise />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Logins />,
  },
  {
    path: "/info",
    element: <InfoStudent />,
  },
  // Admin
  {
    path: "/admin-edit-info",
    element: <MainLayoutAdmin />,
  },
  {
    path: "/edit-info",
    element: <InfoStudentForAdmin />,
  },
  {
    path: "/quan-ly-bang",
    element: <QuanLyBang />,
  },
  {
    path: "/new-customer",
    element: <QuanLyKhachHangMoi />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
reportWebVitals();
