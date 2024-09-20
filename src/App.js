import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import NotFound from './components/NotFound'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <NotFound />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
