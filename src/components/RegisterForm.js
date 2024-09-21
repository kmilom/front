import React, { useState, useEffect } from "react";
import axios from "axios";

const RegisterForm = () => {

    const [genders, setGenders] = useState([]);

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
            const idUser = responsePerson.data.body
            console.log("id persona: ", idUser);
            const updatedUserData = {
                ...userData,
                Id: idUser
            }
            console.log("Usuario: ", updatedUserData);
            await axios.post('http://localhost:4000/api/users', updatedUserData);
        } catch (error) {
            console.error("Error al crear registro: ", error);
        }
    };

    return(
        <div className="grid grid-cols-11">
            <div className = "border border-gray-300 rounded-md shadow-md bg-gray-50 p-5 col-span-5 col-start-4">
                <form onSubmit = {handleSubmit} className = "grid grid-cols-12">
                    <div className = "mb-4 grid grid-cols-12 col-span-8 col-start-2">
                        <label htmlFor = "Name" className = "grid justify-center col-span-4">Nombres: </label>
                        <input className = "border border-gray-200 rounded-md col-span-8"
                            type = "text"
                            id = "Name"
                            name = "Name"
                            value = {formData.Name}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4 grid grid-cols-12 col-span-8 col-start-2">
                        <label htmlFor = "LastName" className = "grid justify-center col-span-4">Apellidos: </label>
                        <input className = "border border-gray-200 rounded-md col-span-8"
                            type = "text"
                            id = "LastName"
                            name = "LastName"
                            value = {formData.LastName}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4 grid grid-cols-12 col-span-8 col-start-2">
                        <label htmlFor = "Email" className = "grid justify-center col-span-4">Correo: </label>
                        <input className = "border border-gray-200 rounded-md col-span-8"
                            type = "email"
                            id = "Email"
                            name = "Email"
                            value = {formData.Email}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4 grid grid-cols-12 col-span-6">
                        <label htmlFor = "Birthdate" className = "grid justify-center col-span-7">Fecha de nacimiento: </label>
                        <input className = "border border-gray-200 rounded-md col-span-5"
                            type = "date"
                            id = "Birthdate"
                            name = "Birthdate"
                            value = {formData.Birthdate}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4 grid grid-cols-12 col-span-6">
                        <label htmlFor = "IdGender" className = "grid justify-center col-span-4">Género: </label>
                        <select className = "border border-gray-200 rounded-md col-span-6"
                            id = "IdGender"
                            name = "IdGender"
                            value = {formData.IdGender}
                            onChange = {handleChange}
                            required
                        >
                            <option value = "">Seleccione un g&eacute;nero</option>
                            {genders.map((gender) => (
                                <option key = {gender.Id} value = {gender.Id}>{gender.Gender}</option>
                            ))}
                        </select>
                    </div>
                    <div className = "mb-4 grid grid-cols-12 col-span-8 col-start-2">
                        <label htmlFor = "Username" className = "grid justify-center col-span-4">Usuario: </label>
                        <input className = "border border-gray-200 rounded-md col-span-8"
                            type = "text"
                            id = "Username"
                            name = "Username"
                            value = {formData.Username}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className = "mb-4 grid grid-cols-12 col-span-8 col-start-2">
                        <label htmlFor = "Password" className = "grid justify-center col-span-4">Contraseña: </label>
                        <input className = "border border-gray-200 rounded-md col-span-8"
                            type = "password"
                            id = "Password"
                            name = "Password"
                            value = {formData.Password}
                            onChange = {handleChange}
                            required
                        />
                    </div>
                    <div className="col-span-3 col-start-5">
                        <button type="submit" className = "p-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Registrar usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;