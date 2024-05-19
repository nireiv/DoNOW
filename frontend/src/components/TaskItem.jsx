import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Card, CardContent, CardActions, Typography, Grid } from '@mui/material';

const TaskItem = ({ task, fetchTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/tasks/${task.id}`, updatedTask);
            fetchTasks();
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${task.id}`);
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
                {isEditing ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Task Name"
                                name="task_name"
                                value={updatedTask.task_name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                value={updatedTask.description}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="date"
                                label="Deadline"
                                name="deadline"
                                value={updatedTask.deadline}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={updatedTask.status}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                ) : (
                    <div>
                        <Typography variant="h6">{task.task_name}</Typography>
                        <Typography variant="body2">{task.description}</Typography>
                        <Typography variant="body2">Deadline: {task.deadline}</Typography>
                        <Typography variant="body2">Status: {task.status}</Typography>
                    </div>
                )}
            </CardContent>
            <CardActions>
                {isEditing ? (
                    <>
                        <Button size="small" onClick={handleUpdate}>Update</Button>
                        <Button size="small" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button size="small" onClick={() => setIsEditing(true)}>Edit</Button>
                        <Button size="small" onClick={handleDelete}>Delete</Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default TaskItem;
