# Task Management Application

This is a Simple Task Management Web Application built for the Full Stack Internship Practical Coding Assessment.

## Technologies Used
*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (DOM Manipulation & Fetch API)
*   **Backend:** Node.js, Express.js
*   **Database:** MySQL

## Features
*   **Create Task:** Add a new task with a title and description.
*   **Read Tasks:** View all your pending and completed tasks.
*   **Update Task:** Edit the title or description of an existing task.
*   **Update Status:** Mark tasks as "Completed" or "Pending".
*   **Delete Task:** Remove a task permanently.
*   **Validation:** Basic form validation to ensure titles are not empty.

## Prerequisites
*   [Node.js](https://nodejs.org/) installed on your machine.
*   [MySQL](https://www.mysql.com/) installed and running on your machine.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    [git clone <https://github.com/stephen4599/Task-Manager>
    cd Task
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Database Configuration:**
    Open `db.js` and update the MySQL connection details (`user` and `password`) to match your local MySQL configuration. The database `task_db` and the required tables will be created automatically upon server start.

4.  **Start the Server:**
    Run the following command to start the backend server:
    ```bash
    npm start
    ```
  write a command to run backend
     ```
     node server.js
        ```

4.  **Access the Application:**
    Open your web browser and navigate to `http://localhost:3000`.

## API Endpoints

*   `GET /api/tasks` - Fetch all tasks
*   `POST /api/tasks` - Create a new task (Requires `title`, optional `description`)
*   `PUT /api/tasks/:id` - Update a task (Requires `title`, `description`, `status`)
*   `DELETE /api/tasks/:id` - Delete a task

*   The application adheres strictly to the assessment requirements, prioritizing simplicity, clarity, and correctness.
*   The application uses MySQL. Ensure that your MySQL server is running before starting the application.
*   User Authentication was intentionally omitted as it was not a part of the core "Task Management" functional requirements.
*   The frontend uses standard HTML/CSS and Vanilla JavaScript Fetch API to interact with the Express RESTful backend.
