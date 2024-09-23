import React, { useState } from "react"; // Importa React y useState
import axios from "axios"; // Importa axios para hacer peticiones HTTP
import Modal from "./Modal"; // Importa el componente Modal
import TaskForm from "./TaskForm"; // Importa el componente TaskForm

const TaskList = (props) => {
    const [selectedTask, setSelectedTask] = useState(null); // Estado para almacenar la tarea seleccionada

    // Abre el modal con la tarea seleccionada
    const openModal = (task) => setSelectedTask(task);
    // Cierra el modal
    const closeModal = () => setSelectedTask(null);

    // Maneja el cambio de estado de la tarea
    const handleToggleState = async (task) => {
        try {
            const updatedTask = {
                ...task,
                IdTaskState: task.IdTaskState === 1 ? 2 : 1, // Cambia el estado (1 = Pendiente, 2 = Completado)
            };
            await axios.post('http://localhost:4000/api/tasks/editar', updatedTask); // Actualiza la tarea en el servidor
            console.log(`Estado de la tarea con id ${task.Id} actualizado correctamente`);
        } catch (error) {
            console.error("Error al actualizar el estado de la tarea:", error); // Manejo de errores
        }
    };

    // Maneja la eliminación de una tarea
    const handleDelete = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/tasks/${id}`); // Elimina la tarea en el servidor
            console.log(`Tarea con id ${id} eliminada correctamente`);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error); // Manejo de errores
        }
    };

    return (
        <div className="overflow-x-auto">
            {props.props.length > 0 ? ( // Verifica si hay tareas en la lista
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2">T&iacute;tulo</th>
                            <th className="px-4 py-2">Descripci&oacute;n</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {props.props.map(task => ( // Mapea cada tarea en la lista
                            <tr 
                                key={task.Id} 
                                className="border-b hover:bg-gray-100 transition duration-200"
                            >
                                {/* Título de la tarea */}
                                <td className="px-4 py-2 border-r">{task.Title}</td>

                                {/* Descripción de la tarea */}
                                <td className="px-4 py-2 border-r">{task.Description}</td>

                                {/* Estado de la tarea */}
                                <td className="px-4 py-2 border-r">
                                    <button 
                                        onClick={() => handleToggleState(task)} // Cambia el estado de la tarea
                                        className={`p-1 rounded-md ${task.IdTaskState === 1 ? 'bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200' : 'bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-200'} text-white`}
                                    >
                                        {task.IdTaskState === 1 ? 'Pendiente' : 'Completada'} {/* Muestra el estado */}
                                    </button>
                                </td>

                                {/* Acciones: Editar y Eliminar */}
                                <td className="px-4 py-2 flex space-x-2 justify-center">
                                    {/* Botón de Editar */}
                                    <button onClick={() => openModal(task)} className="bg-yellow-400 text-white p-1 rounded-md hover:bg-yellow-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0l-9.5 9.5a1 1 0 00-.263.496l-.8 4a1 1 0 001.212 1.213l4-.8a1 1 0 00.496-.263l9.5-9.5a2 2 0 000-2.828l-2.828-2.828zM5 13l4 4L4 18v-3l1-2z" />
                                        </svg>
                                    </button>

                                    {/* Botón de Eliminar */}
                                    <button className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600" onClick={() => handleDelete(task.Id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h5a1 1 0 010 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h5zm2 0h2V2H9v2zm0 4a1 1 0 112 0v8a1 1 0 01-2 0V8z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {/* Mostrar el Modal solo si hay una tarea seleccionada */}
                                    {selectedTask && selectedTask.Id === task.Id && (
                                        <Modal isOpen={!!selectedTask} closeModal={closeModal}>
                                            <h2 className="text-xl font-bold mb-4">Editar tarea</h2>
                                            <TaskForm closeModal={closeModal} task={selectedTask} />
                                        </Modal>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay ninguna tarea en la lista</p> // Mensaje si no hay tareas
            )}
        </div>
    );
};

export default TaskList; // Exporta el componente TaskList
