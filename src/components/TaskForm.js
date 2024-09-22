import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TaskForm = ({ closeModal, task }) => {

    const { id } = useParams();

    const [formData, setFormData] = useState(task);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        closeModal();
        try {
            if (task.IdUser !== '') {
                await axios.post('http://localhost:4000/api/tasks/editar', formData);
            } else {
                const dataComplete = {
                    ...formData,
                    IdUser: id,
                    IdTaskState: 1
                }
                await axios.post('http://localhost:4000/api/tasks', dataComplete);
            }
        } catch (error) {
            console.error("Error al crear registro: ", error);
        }
    }

    return(
        <div>
            <form onSubmit = {handleSubmit}>
                <div className = "mb-4">
                    <input className = "border border-gray-200 rounded-md"
                        placeholder = " Título"
                        type = "text"
                        id = "Title"
                        name = "Title"
                        value = {formData.Title}
                        onChange = {handleChange}
                        required
                    />
                </div>
                <div className = "mb-4">
                    <input className = "border border-gray-200 rounded-md"
                        placeholder = " Descripción"
                        type = "text"
                        id = "Description"
                        name = "Description"
                        value = {formData.Description}
                        onChange = {handleChange}
                        required
                    />
                </div>
                <div className="col-span-12 grid justify-center">
                    <button type="submit" className = "p-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;