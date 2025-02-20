import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from './pages/HomePage';
import RootPage from './RootPage';
import Register from './pages/Register';
import { ThemeProvider } from 'next-themes';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage></RootPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      }
    ]
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
    <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
