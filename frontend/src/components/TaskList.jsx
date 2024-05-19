import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { Grid, Box } from '@mui/material';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Box mt={2}>
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task.id}>
                        <TaskItem task={task} fetchTasks={fetchTasks} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TaskList;
