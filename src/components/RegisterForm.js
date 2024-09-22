import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logouser.png";

const RegisterForm = () => {

    const [genders, setGenders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/api/genders')
        .then(response => {
            if (Array.isArray(response.data.body)) {
                setGenders(response.data.body);
            } else {
                console.error("La respuesta no es un array");
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos: ", error);
        });
    }, []);

    const [formData, setFormData] = useState({
        Name: '',
        LastName: '',
        Birthdate: '',
        Email: '',
        IdGender: ''
    });

    const [userData, setUserData] = useState({
        Id: '',
        Username: '',
        Password: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        if(name === "Username" || name === "Password"){
            setUserData({
                ...userData,
                [name]: value
            });
        } else{
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const responsePerson = await axios.post('http://localhost:4000/api/people', formData);
            const idUser = responsePerson.data.body;
            const updatedUserData = {
                ...userData,
                Id: idUser
            }
            await axios.post('http://localhost:4000/api/users', updatedUserData);
        } catch (error) {
            console.error("Error al crear registro: ", error);
        }

        alert('Usuario registrado');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return(
        <div className="grid grid-cols-11">
            <div className = "border border-gray-300 rounded-md shadow-md bg-gray-50 p-5 col-span-5 col-start-4">
            <div className = "flex justify-center mb-4 py-3"><img src = {Logo} alt = "Logo de usuario" className = "w-16 h-16 object-cover rounded-full" /></div>
                <form onSubmit = {handleSubmit} className = "grid grid-cols-12">
                    <div className = "mb-4 col-span-5 col-start-2">
                        <input className = "border border-gray-200 rounded-md"
                            placeholder = " Nombre"
                            type = "text"
                            id = "Name"
                            name = "Name"
                            value = {formData.Name}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4 col-span-5 col-start-8">
                        <input className = "border border-gray-200 rounded-md"
                            placeholder = " Apellido"
                            type = "text"
                            id = "LastName"
                            name = "LastName"
                            value = {formData.LastName}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4  col-span-5 col-start-2">
                        <input className = "border border-gray-200 rounded-md"
                            placeholder = " Correo electronico"
                            type = "email"
                            id = "Email"
                            name = "Email"
                            value = {formData.Email}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4 col-span-5 col-start-9">
                        <select className = "border border-gray-200 rounded-md"
                            id = "IdGender"
                            name = "IdGender"
                            value = {formData.IdGender}
                            onChange = {handleChange}
                            required
                        >
                            <option value = "">G&eacute;nero</option>
                            {genders.map((gender) => (
                                <option key = {gender.Id} value = {gender.Id}>{gender.Gender}</option>
                            ))}
                        </select>
                    </div>
                    <div className = "mb-4 grid grid-cols-12 col-span-6 col-start-4">
                        <label htmlFor = "Birthdate" className = " col-span-7">Fecha de nacimiento: </label>
                        <input className = "border border-gray-200 rounded-md col-span-5"
                            type = "date"
                            id = "Birthdate"
                            name = "Birthdate"
                            value = {formData.Birthdate}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4 grid justify-center col-span-12">
                        <input className = "border border-gray-200 rounded-md"
                            placeholder = " Usuario"
                            type = "text"
                            id = "Username"
                            name = "Username"
                            value = {formData.Username}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4 grid justify-center col-span-12">
                        <input className = "border border-gray-200 rounded-md"
                            placeholder = " Contraseña"
                            type = "password"
                            id = "Password"
                            name = "Password"
                            value = {formData.Password}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className="col-span-12 grid justify-center">
                        <button type="submit" className = "p-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Registrar usuario
                        </button>
                    </div>
                    <div className = "flex justify-center py-3 col-span-12">
                        <p className = "hover:text-blue-500"><Link to = "/">Volver</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;