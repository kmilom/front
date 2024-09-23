import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import Logo from "../assets/logouser.png";
import { useAuth } from "../context/authContext"; 

const LoginForm = () => {
    const { login } = useAuth(); 
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        Username: '',
        Password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:4000/api/users/login', { params: formData });
            const token = response.data.body.token; 
            const userId = response.data.body.Id; 
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            login(token);
            navigate(`/sesion/${userId}`); 
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error en el inicio de sesión');
        }
    };

    return (
        <div className="border border-gray-300 rounded-md shadow-md bg-gray-50 p-5">
            <div className="flex justify-center mb-4 py-3"><img src={Logo} alt="Logo de usuario" className="w-16 h-16 object-cover rounded-full" /></div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 grid grid-cols-4">
                    <input className="border border-gray-200 rounded-md col-span-2 col-start-2"
                        placeholder=" Usuario"
                        type="text"
                        id="Username"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="p-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Iniciar Sesión
                    </button>
                </div>
                <div className="flex justify-center py-3">
                    <p className="hover:text-blue-500"><Link to="/registro">Reg&iacute;strate aqu&iacute;</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
