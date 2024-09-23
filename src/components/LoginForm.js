import React, { useState } from "react"; // Importa React y useState para manejar el estado
import axios from "axios"; // Importa Axios para realizar solicitudes HTTP
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate para la navegación
import Logo from "../assets/logouser.png"; // Importa la imagen del logo

// Componente del formulario de inicio de sesión
const LoginForm = () => {
    const navigate = useNavigate(); // Inicializa la navegación

    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        Username: '', // Almacena el nombre de usuario
        Password: ''  // Almacena la contraseña
    });

    // Maneja los cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target; // Desestructura el evento
        setFormData({
            ...formData, // Mantiene los valores actuales
            [name]: value // Actualiza el campo correspondiente
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            // Realiza la solicitud para iniciar sesión
            const response = await axios.get('http://localhost:4000/api/users/login', { params: formData });
            const token = response.data.body.token; // Obtiene el token de la respuesta
            const userId = response.data.body.Id; // Obtiene el ID del usuario
            localStorage.setItem('token', token); // Almacena el token en el almacenamiento local
            localStorage.setItem('userId', userId); // Almacena el ID del usuario en el almacenamiento local
            //login(token); // Llama a la función de login
            navigate(`/sesion/${userId}`); // Redirige a la sesión del usuario
        } catch (error) {
            console.error('Error al iniciar sesión:', error); // Muestra un error en la consola
            alert('Error en el inicio de sesión'); // Muestra una alerta de error
        }
    };

    return (
        <div className="border border-gray-300 rounded-md shadow-md bg-gray-50 p-5">
            <div className="flex justify-center mb-4 py-3">
                <img src={Logo} alt="Logo de usuario" className="w-16 h-16 object-cover rounded-full" /> {/* Muestra el logo */}
            </div>
            <form onSubmit={handleSubmit}> {/* Maneja el envío del formulario */}
                <div className="mb-4 grid grid-cols-4">
                    <input className="border border-gray-200 rounded-md col-span-2 col-start-2"
                        placeholder=" Usuario"
                        type="text"
                        id="Username"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange} // Llama a handleChange al cambiar el campo
                        required
                    />
                </div>
                <div className="mb-4 grid grid-cols-4">
                    <input className="border border-gray-200 rounded-md col-span-2 col-start-2"
                        placeholder=" Contraseña"
                        type="password"
                        id="Password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange} // Llama a handleChange al cambiar el campo
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="p-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Iniciar Sesión {/* Botón para enviar el formulario */}
                    </button>
                </div>
                <div className="flex justify-center py-3">
                    <p className="hover:text-blue-500"><Link to="/registro">Reg&iacute;strate aqu&iacute;</Link></p> {/* Enlace para registro */}
                </div>
            </form>
        </div>
    );
};

export default LoginForm; // Exporta el componente LoginForm
