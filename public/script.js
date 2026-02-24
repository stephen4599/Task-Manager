const API_URL = '/api/tasks';

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", fetchTasks);

// Fetch all tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear current list

        if (tasks.length === 0) {
            taskList.innerHTML = '<p class="no-tasks">No tasks found. Create one above!</p>';
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.status === 'Completed' ? 'completed' : ''}`;

            li.innerHTML = `
                <div class="task-content">
                    <h4 class="task-title ${task.status === 'Completed' ? 'strike' : ''}">${task.title}</h4>
                    <p class="task-desc">${task.description || ''}</p>
                    <small>Status: ${task.status}</small>
                </div>
                <div class="task-actions">
                    <button class="btn-toggle" onclick="toggleStatus(${task.id}, '${task.status}', '${task.title}', '${task.description}')">
                        ${task.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
                    </button>
                    <button class="btn-edit" onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.status}')">Edit</button>
                    <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        showError("Failed to load tasks.");
    }
}

// Add a new task
async function addTask() {
    const titleInput = document.getElementById('title');
    const descInput = document.getElementById('description');
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!title) {
        showError("Title is required!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            titleInput.value = '';
            descInput.value = '';
            showError(""); // Clear errors
            fetchTasks(); // Reload the list
        } else {
            const err = await response.json();
            showError(err.error || "Failed to create task");
        }
    } catch (error) {
        console.error("Error adding task:", error);
        showError("Failed to add task.");
    }
}

// Delete a task
async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchTasks(); // Reload the list
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task.");
    }
}

// Toggle status between Pending and Completed
async function toggleStatus(id, currentStatus, title, description) {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, status: newStatus })
        });

        if (response.ok) {
            fetchTasks(); // Reload list
        }
    } catch (error) {
        console.error("Error updating status:", error);
    }
}

// Edit a task (Simple prompt-based editing for speed)
async function editTask(id, oldTitle, oldDesc, currentStatus) {
    const newTitle = prompt("Edit Task Title:", oldTitle);
    if (newTitle === null) return; // User cancelled

    if (newTitle.trim() === "") {
        alert("Title cannot be empty!");
        return;
    }

    const newDesc = prompt("Edit Task Description:", oldDesc !== 'null' ? oldDesc : '');
    if (newDesc === null) return; // User cancelled

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: newTitle.trim(),
                description: newDesc.trim(),
                status: currentStatus
            })
        });

        if (response.ok) {
            fetchTasks(); // Reload list
        }
    } catch (error) {
        console.error("Error editing task:", error);
        alert("Failed to edit task.");
    }
}

// Show error message
function showError(msg) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = msg;
}