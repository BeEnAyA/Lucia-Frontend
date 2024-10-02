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
import GoogleCallback from './services/googleCallback.tsx';
import VerifyEmail from './components/VerifyEmail.tsx';
import ResetPassword from './components/ResetPassword.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: 'login/google/callback',
    element: <GoogleCallback />
  },
  {
    path: '/register',
    element: <Register />
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
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>,
)
