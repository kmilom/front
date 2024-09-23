import React, { useState } from "react"; // Importa React y useState
import { useParams } from "react-router-dom"; // Importa useParams para acceder a los parámetros de la URL
import axios from "axios"; // Importa axios para hacer peticiones HTTP

const TaskForm = ({ closeModal, task }) => {
    const { id } = useParams(); // Obtiene el ID de los parámetros de la URL

    const [formData, setFormData] = useState(task); // Inicializa el estado con los datos de la tarea

    // Maneja el cambio en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value // Actualiza el estado del formulario con los nuevos valores
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        closeModal(); // Cierra el modal después de enviar el formulario
        try {
            // Si la tarea ya tiene un IdUser, actualiza la tarea existente
            if (task.IdUser !== '') {
                await axios.post('http://localhost:4000/api/tasks/editar', formData);
            } else {
                // Si es una nueva tarea, añade el IdUser y el estado de la tarea
                const dataComplete = {
                    ...formData,
                    IdUser: id,
                    IdTaskState: 1
                }
                await axios.post('http://localhost:4000/api/tasks', dataComplete);
            }
        } catch (error) {
            console.error("Error al crear registro: ", error); // Manejo de errores
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}> {/* Maneja el envío del formulario */}
                <div className="mb-4">
                    <input className="border border-gray-200 rounded-md"
                        placeholder=" Título"
                        type="text"
                        id="Title"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange} // Maneja el cambio en el campo
                        required
                    />
                </div>
                <div className="mb-4">
                    <input className="border border-gray-200 rounded-md"
                        placeholder=" Descripción"
                        type="text"
                        id="Description"
                        name="Description"
                        value={formData.Description}
                        onChange={handleChange} // Maneja el cambio en el campo
                        required
                    />
                </div>
                <div className="col-span-12 grid justify-center">
                    <button type="submit" className="p-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskForm; // Exporta el componente TaskForm
