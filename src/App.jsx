import React from 'react'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useSelector } from "react-redux"
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ToastExample from './Components/Toast';
import Circular from './Components/Circular';
import Employees from "./Pages/Employees"
import Departments from "./Pages/Departments"
import Modal from './Components/Modal';
const App = () => {
  const { currentUser } = useSelector(state => state.user);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login"></Navigate>
  }

  const RequireRole = ({ children }) => {
    return currentUser.role == "manager" ? children : <h2>Access Denied...</h2>
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/",
      element: <RequireAuth><Home /></RequireAuth>,
    },
    {
      path: "/employees",
      element: <RequireAuth><Employees /></RequireAuth>,
    },
    {
      path: "/departments",
      element: <RequireAuth><RequireRole><Departments /></RequireRole></RequireAuth>,
    },
  ]);

  return (
    <>
      <ToastExample />
      <Circular />
      <Modal />
      <RouterProvider router={router} />

    </>
  )
}

export default App