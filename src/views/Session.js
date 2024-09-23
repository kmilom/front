import React, { useEffect, useState } from "react"; // Importa React y hooks necesarios
import axios from "axios"; // Importa Axios para realizar peticiones HTTP
import { useParams, useNavigate } from "react-router-dom"; // Importa hooks para manejar parámetros y navegación
import Header from "../components/Header"; // Importa el componente Header
import TaskList from "../components/TaskList"; // Importa el componente TaskList

const Session = () => {
    const { id } = useParams(); // Obtiene el ID de los parámetros de la ruta
    const navigate = useNavigate(); // Hook para la navegación

    const [personData, setPersonData] = useState(null); // Estado para almacenar los datos de la persona
    const [taskData, setTaskData] = useState([]); // Estado para almacenar las tareas

    // Efecto para obtener los datos de la persona y las tareas
    useEffect(() => {
        const fetchPerson = async () => {
            const token = localStorage.getItem('token'); // Obtiene el token de localStorage
            const storedUserId = localStorage.getItem('userId'); // Obtiene el ID de usuario de localStorage
            if (!token || storedUserId !== id) {
                navigate('/'); // Redirige si no hay token o si el ID no coincide
                return; // Sale de la función si no se cumplen las condiciones
            }
            try {
                // Realiza una petición para obtener los datos de la persona
                const response = await axios.get(`http://localhost:4000/api/people/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Agrega el token a la cabecera de autorización
                    }
                });
                setPersonData(response.data.body[0]); // Almacena los datos de la persona en el estado
            } catch (error) {
                console.error('Error fetching person data:', error); // Manejo de errores
            }
        }

        const fetchTasks = async () => {
            try {
                // Realiza una petición para obtener las tareas asociadas a la persona
                const response = await axios.get(`http://localhost:4000/api/tasks/${id}`);
                setTaskData(response.data.body); // Almacena las tareas en el estado
            } catch (error) {
                console.error('Error fetching task data:', error); // Manejo de errores
            }
        }

        fetchPerson(); // Llama a la función para obtener datos de la persona
        fetchTasks(); // Llama a la función para obtener las tareas
    }, [id,personData, taskData, navigate]); // Dependencias del efecto

    // Muestra un mensaje de carga mientras se obtienen los datos de la persona
    if (!personData) {
        return <p>Loading person data...</p>;
    }

    return (
        <div className="min-h-screen bg-blue-100">
            <Header props={personData} /> {/* Renderiza el componente Header con los datos de la persona */}
            <div className="grid justify-center">
                <TaskList props={taskData} /> {/* Renderiza el componente TaskList con las tareas obtenidas */}
            </div>
        </div>
    );
}

export default Session; // Exporta el componente Session
