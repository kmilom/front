import React, { useState } from "react"; // Importa React y el hook useState
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate para la navegación
import Modal from "./Modal"; // Importa el componente Modal
import TaskForm from './TaskForm'; // Importa el componente TaskForm

const Header = ({ props }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal

    // Función para abrir el modal
    const openModal = () => setIsModalOpen(true);
    // Función para cerrar el modal
    const closeModal = () => setIsModalOpen(false);

    // Modelo para una nueva tarea
    const taskModel = {
        Title: '',
        Description: '',
        IdUser: '',
        IdTaskState: ''
    };

    const navigate = useNavigate(); // Hook para la navegación

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        localStorage.removeItem('userId'); // Elimina el ID del usuario del almacenamiento local
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <div className="bg-blue-700 text-white text-lg py-2 grid grid-cols-8 mb-2">
            <div className="col-span-2">Bienvenido, {props.Name} {props.LastName}</div>
            <div className="col-span-2 col-start-5 grid justify-end">
                {/* Botón para agregar una nueva tarea, abre el modal */}
                <button onClick={openModal} className="bg-red-500 py-2 px-3 text-base rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
                    Agregar tarea
                </button>
            </div>
            <div className="col-span-2 grid justify-end text-sm">
                {/* Botón para cerrar sesión */}
                <button onClick={handleLogout} className="text-sm text-white hover:underline">Cerrar Sesi&oacute;n</button>
            </div>
            
            {/* Componente Modal que se abre para agregar una nueva tarea */}
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <h2 className="text-xl font-bold mb-4">Agregar nueva tarea</h2>
                <TaskForm closeModal={closeModal} task={taskModel} /> {/* Formulario para agregar tarea */}
            </Modal>
        </div>
    );
}

export default Header; // Exporta el componente Header
