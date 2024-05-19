const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const todolistRepo = require('./backend/todolist.repo');

const port = 5000;
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Endpoint
app.post('/tasks', todolistRepo.addTask);
app.get('/tasks', todolistRepo.getAllTasks);
app.put('/tasks/:id', todolistRepo.updateTask);
app.delete('/tasks/:id', todolistRepo.deleteTask);

//Logging
app.listen(port, () => {
    console.log("Server is running and listening on port", port);
});