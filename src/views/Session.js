import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TaskList from "../components/TaskList";

const Session = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [personData, setPersonData] = useState(null);
    const [taskData, setTaskData] = useState([]);

    useEffect(() => {
        const fetchPerson = async () => {
            const token = localStorage.getItem('token');
            const storedUserId = localStorage.getItem('userId');
            if (!token || storedUserId !== id) {
                navigate('/'); // Redirige si no hay token
                return;
              }
            try {
                const response = await axios.get(`http://localhost:4000/api/people/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPersonData(response.data.body[0]);
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        }

        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/tasks/${id}`);
                setTaskData(response.data.body);
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        }

        fetchPerson();
        fetchTasks();
    }, [id, personData, taskData, navigate]);

    if (!personData || !taskData) {
        return <p>Loading person data...</p>;
    }

    return(
        <div className = "min-h-screen bg-blue-100">
            <Header props = {personData} />
            <div className = "grid justify-center">
                <TaskList props = {taskData} />
            </div>
        </div>
    );
}

export default Session;