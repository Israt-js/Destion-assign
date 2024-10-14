import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import AuthProvider from './AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
    children: [
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>
)
