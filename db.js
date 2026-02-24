const mysql = require('mysql2');

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // change if different
    password: 'St@4599#' // add your MySQL password here
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
        return;
    }
    console.log("Connected to MySQL server.");

    // Create database if it doesn't exist
    db.query('CREATE DATABASE IF NOT EXISTS task_db', (err) => {
        if (err) {
            console.error("Error creating database:", err.message);
            return;
        }

        // Select the database
        db.changeUser({ database: 'task_db' }, (err) => {
            if (err) {
                console.error("Error selecting database:", err.message);
                return;
            }
            console.log("Connected to task_db database.");

            // Create tasks table if not exists
            const createTable = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                status ENUM('Pending', 'Completed') DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `;

            db.query(createTable, (err) => {
                if (err) {
                    console.error("Error creating table:", err.message);
                } else {
                    console.log("Tasks table ensured.");
                }
            });
        });
    });
});

module.exports = db;