import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
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
        element: <Dashboard></Dashboard>,
       },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
