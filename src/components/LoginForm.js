import React, { useState } from "react";
import Logo from "../assets/logouser.png"

const LoginForm = () => {

    const [formData, setFormData] = useState({
        Username: '',
        Password: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log("Datos del formulario: ", formData);
    };

    return(
        <div className = "border border-gray-300 rounded-md shadow-md bg-gray-50 p-5">
            <div className = "flex justify-center mb-4 py-3"><img src = {Logo} alt = "Logo de usuario" className = "w-16 h-16 object-cover rounded-full" /></div>
            <form onSubmit = {handleSubmit} >
                <div className="mb-4 grid grid-cols-3">
                    <label htmlFor = "Username" className="grid justify-center">Usuario: </label>
                    <input className = "border border-gray-200 rounded-md col-span-2"
                        type = "text"
                        id = "Username"
                        name = "Username"
                        value = {formData.Usersame}
                        onChange = {handleChange}
                        required
                    />
                </div>
                <div className="mb-4 grid grid-cols-3">
                    <label htmlFor = "Password" className="grid justify-center">Contraseña: </label>
                    <input className = "border border-gray-200 rounded-md col-span-2"
                        type = "password"
                        id = "Password"
                        name = "Password"
                        value = {formData.Password}
                        onChange = {handleChange}
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="p-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;