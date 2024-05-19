import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, Paper } from '@mui/material';

const TaskForm = ({ fetchTasks }) => {
    const [task, setTask] = useState({
        task_name: '',
        description: '',
        deadline: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks', task);
            fetchTasks();
            setTask({ task_name: '', description: '', deadline: '', status: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Task Name"
                    name="task_name"
                    value={task.task_name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={2}
                />
                <TextField
                    type="date"
                    label="Deadline"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Add Task</Button>
            </Box>
        </Paper>
    );
};

export default TaskForm;
