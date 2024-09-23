import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound'
import Home from './views/Home';
import Register from './views/Register';
import Session from './views/Session';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <NotFound />
  },
  {
    path: '/registro',
    element: <Register />
  },
  {
    path: '/sesion/:id',
    element: <Session />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
