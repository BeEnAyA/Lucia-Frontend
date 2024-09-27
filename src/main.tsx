import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import ForgotPassword from './components/ForgotPassword.tsx';
import { AuthProvider } from './context/authContext.tsx';
import App from './App.tsx';
import GoogleCallback from './assets/services/googleCallback.tsx';
import VerifyEmail from './components/VerifyEmail.tsx';
import ResetPassword from './components/ResetPassword.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider><App /></AuthProvider>
  },
  {
    path: '/login',
    element: <AuthProvider><Login /></AuthProvider>
  },
  {
    path: 'login/google/callback',
    element: <AuthProvider><GoogleCallback /></AuthProvider>
  },
  {
    path: '/register',
    element: <AuthProvider><Register /></AuthProvider>
  },
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} >
    </RouterProvider>
  </StrictMode>,
)
