const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { app, server } = require('./sockets/socketController');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    console.log('Request Body:', req.body);
    if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
        console.log('WebSocket request');
    }
    next();
});
require('./config/dbConnection')();


// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Authentication route
app.use('/api', require('./routes/authRoutes'));

// Middleware for JWT authentication
app.use('/test', require('./middleware/jwtAuth'))
app.get("/test/x", (req, res) => {
    res.send("Authentication success")
})


const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})