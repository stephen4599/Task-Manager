const express = require('express');
const router = express.Router();
const db = require('../db');
// CREATE TASK
router.post('/', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const sql = "INSERT INTO tasks (title, description) VALUES (?, ?)";

    db.query(sql, [title, description], function (err, result) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task created successfully", id: result.insertId });
    });
});

// GET ALL TASKS
router.get('/', (req, res) => {
    db.query(
        "SELECT * FROM tasks ORDER BY created_at DESC",
        [],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

// UPDATE TASK
router.put('/:id', (req, res) => {
    const { title, description, status } = req.body;
    const { id } = req.params;

    const sql = "UPDATE tasks SET title=?, description=?, status=? WHERE id=?";

    db.query(sql, [title, description, status, id], function (err, result) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task updated successfully", changes: result.affectedRows });
    });
});

// DELETE TASK
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM tasks WHERE id=?",
        [id],
        function (err, result) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Task deleted successfully", changes: result.affectedRows });
        }
    );
});

module.exports = router;