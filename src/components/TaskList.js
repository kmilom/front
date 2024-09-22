import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import TaskForm from "./TaskForm";

const TaskList = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/tasks/${id}`);
            console.log(`Tarea con id ${id} eliminada correctamente`);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">T&iacute;tulo</th>
                        <th className="px-4 py-2">Descripci&oacute;n</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {props.props.map(task => (
                        <tr 
                            key={task.Id} 
                            className="border-b hover:bg-gray-100 transition duration-200"
                        >
                            {/* Título de la tarea */}
                            <td className="px-4 py-2 border-r">{task.Title}</td>

                            {/* Descripción de la tarea */}
                            <td className="px-4 py-2 border-r">{task.Description}</td>

                            <td className="px-4 py-2 flex space-x-2 justify-center">
                                {/* Botón de Editar */}
                                <button onClick={openModal} className="bg-yellow-400 text-white p-1 rounded-md hover:bg-yellow-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0l-9.5 9.5a1 1 0 00-.263.496l-.8 4a1 1 0 001.212 1.213l4-.8a1 1 0 00.496-.263l9.5-9.5a2 2 0 000-2.828l-2.828-2.828zM5 13l4 4L4 18v-3l1-2z" />
                                    </svg>
                                </button>

                                {/* Botón de Eliminar */}
                                <button className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600" onClick = { () => handleDelete(task.Id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h5a1 1 0 010 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h5zm2 0h2V2H9v2zm0 4a1 1 0 112 0v8a1 1 0 01-2 0V8z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                            <Modal isOpen = {isModalOpen} closeModal = {closeModal}>
                                <h2 className="text-xl font-bold mb-4">Editar tarea</h2>
                                <TaskForm closeModal = {closeModal} title = {task.Title} description = {task.Description} />
                            </Modal>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default TaskList;
