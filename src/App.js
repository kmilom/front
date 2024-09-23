import React from 'react'; // Importa la librería React
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Importa funciones para gestionar rutas
import './App.css'; // Importa estilos de la aplicación
import NotFound from './components/NotFound'; // Componente para manejar rutas no encontradas
import Home from './views/Home'; // Componente para la página de inicio
import Register from './views/Register'; // Componente para el registro de usuarios
import Session from './views/Session'; // Componente para la sesión del usuario

// Crea el router con las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: '/', // Ruta principal
    element: <Home />, // Componente que se renderiza en la ruta principal
    errorElement: <NotFound /> // Componente que se muestra en caso de error (ruta no encontrada)
  },
  {
    path: '/registro', // Ruta para el registro
    element: <Register /> // Componente que se renderiza para el registro
  },
  {
    path: '/sesion/:id', // Ruta para la sesión de un usuario específico
    element: <Session /> // Componente que se renderiza para la sesión del usuario
  }
]);

// Componente principal de la aplicación
function App() {
  return (
    <RouterProvider router={router} /> // Proveedor del router que gestiona las rutas definidas
  );
}

export default App; // Exporta el componente App
