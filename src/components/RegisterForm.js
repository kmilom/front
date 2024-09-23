import React, { useState, useEffect } from "react"; // Importa React y hooks necesarios
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate para la navegación
import axios from "axios"; // Importa Axios para hacer peticiones HTTP
import Logo from "../assets/logouser.png"; // Importa el logo de usuario

const RegisterForm = () => {
    const [genders, setGenders] = useState([]); // Estado para almacenar los géneros
    const navigate = useNavigate(); // Hook para navegar entre rutas

    // Efecto para obtener la lista de géneros al cargar el componente
    useEffect(() => {
        axios.get('http://localhost:4000/api/genders')
            .then(response => {
                if (Array.isArray(response.data.body)) {
                    setGenders(response.data.body); // Almacena géneros en el estado
                } else {
                    console.error("La respuesta no es un array");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos: ", error); // Manejo de errores
            });
    }, []); // Dependencias vacías para ejecutar solo una vez al montar

    // Estado para almacenar datos del formulario
    const [formData, setFormData] = useState({
        Name: '',
        LastName: '',
        Birthdate: '',
        Email: '',
        IdGender: ''
    });

    // Estado para almacenar datos del usuario
    const [userData, setUserData] = useState({
        Id: '',
        Username: '',
        Password: ''
    });

    // Maneja el cambio de inputs en el formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "Username" || name === "Password") {
            setUserData({
                ...userData,
                [name]: value // Actualiza el estado del usuario
            });
        } else {
            setFormData({
                ...formData,
                [name]: value // Actualiza el estado del formulario
            });
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            const responsePerson = await axios.post('http://localhost:4000/api/people', formData); // Crea una nueva persona
            const idUser = responsePerson.data.body; // Obtiene el ID del usuario creado
            const updatedUserData = {
                ...userData,
                Id: idUser // Actualiza el ID del usuario
            }
            await axios.post('http://localhost:4000/api/users', updatedUserData); // Crea un nuevo usuario
        } catch (error) {
            console.error("Error al crear registro: ", error); // Manejo de errores
        }

        alert('Usuario registrado'); // Mensaje de éxito
        setTimeout(() => {
            navigate('/'); // Redirige a la página de inicio después de 2 segundos
        }, 2000);
    };

    return (
        <div className="grid grid-cols-11">
            <div className="border border-gray-300 rounded-md shadow-md bg-gray-50 p-5 col-span-5 col-start-4">
                <div className="flex justify-center mb-4 py-3">
                    <img src={Logo} alt="Logo de usuario" className="w-16 h-16 object-cover rounded-full" />
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-12">
                    {/* Inputs del formulario para registrar un nuevo usuario */}
                    <div className="mb-4 col-span-5 col-start-2">
                        <input className="border border-gray-200 rounded-md"
                            placeholder=" Nombre"
                            type="text"
                            id="Name"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 col-span-5 col-start-8">
                        <input className="border border-gray-200 rounded-md"
                            placeholder=" Apellido"
                            type="text"
                            id="LastName"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 col-span-5 col-start-2">
                        <input className="border border-gray-200 rounded-md"
                            placeholder=" Correo electronico"
                            type="email"
                            id="Email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 col-span-5 col-start-9">
                        <select className="border border-gray-200 rounded-md"
                            id="IdGender"
                            name="IdGender"
                            value={formData.IdGender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">G&eacute;nero</option>
                            {genders.map((gender) => (
                                <option key={gender.Id} value={gender.Id}>{gender.Gender}</option> // Opciones de género
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 grid grid-cols-12 col-span-6 col-start-4">
                        <label htmlFor="Birthdate" className="col-span-7">Fecha de nacimiento: </label>
                        <input className="border border-gray-200 rounded-md col-span-5"
                            type="date"
                            id="Birthdate"
                            name="Birthdate"
                            value={formData.Birthdate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 grid justify-center col-span-12">
                        <input className="border border-gray-200 rounded-md"
                            placeholder=" Usuario"
                            type="text"
                            id="Username"
                            name="Username"
                            value={userData.Username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 grid justify-center col-span-12">
                        <input className="border border-gray-200 rounded-md"
                            placeholder=" Contraseña"
                            type="password"
                            id="Password"
                            name="Password"
                            value={userData.Password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-span-12 grid justify-center">
                        <button type="submit" className="p-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Registrar usuario
                        </button>
                    </div>
                    <div className="flex justify-center py-3 col-span-12">
                        <p className="hover:text-blue-500"><Link to="/">Volver</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm; // Exporta el componente RegisterForm
