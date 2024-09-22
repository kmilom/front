import React, { useState } from "react";
import Modal from "./Modal";
import TaskForm from './TaskForm';

const Header = ({props}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const taskModel = {
        Title: '',
        Description: '',
        IdUser: '',
        IdTaskState: ''
    };

    return(
        <div className = "bg-blue-700 text-white text-lg py-2 grid grid-cols-8 mb-2">
            <div className = "col-span-2">Bienvenido, {props.Name} {props.LastName}</div>
            <div className = "col-span-2 col-start-5 grid justify-end">
                <button onClick = {openModal} className = "bg-red-500 py-2 px-3 text-base rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">Agregar tarea</button>
            </div>
            <div className = "col-span-2 grid justify-end text-sm">Cerrar Sesi&oacute;n &nbsp;&nbsp;</div>
            
            <Modal isOpen = {isModalOpen} closeModal = {closeModal}>
                <h2 className="text-xl font-bold mb-4">Agregar nueva tarea</h2>
                <TaskForm closeModal = {closeModal} task = {taskModel} />
            </Modal>
        </div>
    );
}

export default Header;