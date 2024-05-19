const { Pool } = require('pg');
const moment = require('moment-timezone');

const pool = new Pool({
    user: 'neondb_owner',
    host: 'ep-yellow-scene-a1cqfa2y.ap-southeast-1.aws.neon.tech',
    database: 'vierin_9',
    password: 'jFf5q0mkZVKu',
    ssl: {
        require: true,
    },
});

pool.connect().then(() => {
    console.log("Connected to PostgreSQL database");
});

const enum_status = ['Pending', 'In Progress', 'Completed'];

async function addTask(req, res){
    const { task_name, description, deadline, status } = req.body;
    const localDeadline = moment(deadline).tz("Asia/Jakarta").format();
    
    if (!enum_status.includes(status)) {
        return res.status(400).json({ error: "Invalid Status Value" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO tasks (task_name, description, deadline, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [task_name, description, localDeadline, status]
        );
        const newTask = result.rows[0];
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getAllTasks(req, res){
    try {
        const result = await pool.query(
            'SELECT * FROM tasks'
        );
        const tasks = result.rows;
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateTask(req, res){
    const taskId = req.params.id;
    const { task_name, description, deadline, status } = req.body;
    const localDeadline = moment(deadline).tz("Asia/Jakarta").format();

    if (!enum_status.includes(status)) {
        return res.status(400).json({ error: "Invalid Status Value" });
    }

    try {
        const result = await pool.query(
            'UPDATE tasks SET task_name = $1, description = $2, deadline = $3, status = $4 WHERE id = $5 RETURNING *',
            [task_name, description, localDeadline, status, taskId]
        );
        const updatedTask = result.rows[0];
        if(!updatedTask) {
            return res.status(404).json({ error: "Task Not Found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteTask(req, res){
    const taskId = req.params.id;
    
    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [taskId]
        );
        const deletedTask = result.rows[0];
        if(!deletedTask) {
            return res.status(404).json({ error: "Task Not Found" });
        }
        res.status(200).json({ message: "Task Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addTask,
    getAllTasks,
    updateTask,
    deleteTask,
};