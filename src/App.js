import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound'
import Home from './views/Home';
import Register from './views/Register';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <NotFound />
  },
  {
    path: '/registro',
    element: <Register />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
