const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});