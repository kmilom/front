import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import TaskList from "../components/TaskList";

const Session = () => {

    const { id } = useParams();

    const [personData, setPersonData] = useState(null);
    const [taskData, setTaskData] = useState([]);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/people/${id}`);
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
    }, [id, personData, taskData]);

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