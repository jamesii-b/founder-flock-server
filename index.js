const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


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


const { createServer } = require("http");
const { Server } = require("socket.io");
const authenticateToken = require('./middleware/jwtAuth');
const { validateToken } = require('./utils/jwt-tokens');
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

/*
middlewares
*/
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (validateToken(token)) {
        next();
    } else {
        const err = new Error("not authorized");
        next(err)
    }
});

// io.use((socket, next) => {
//     const sessionID = socket.handshake.auth.sessionID;
//     if (sessionID) {
//         // find existing session
//         const session = sessionStore.findSession(sessionID);
//         if (session) {
//             socket.sessionID = sessionID;
//             socket.userID = session.userID;
//             socket.username = session.username;
//             return next();
//         }
//     }
//     const username = socket.handshake.auth.username;
//     if (!username) {
//         return next(new Error("invalid username"));
//     }
//     // create new session
//     socket.sessionID = randomId();
//     socket.userID = randomId();
//     socket.username = username;
//     next();

// });



// io.on("connection", (socket) => {
//     console.log(socket.id);
//     socket.join(socket.userID);
//     socket.on("setup", (userData) => {
//         socket.join(userData._id)
//         socket.emit("connected", userData._id)

//     });
//     socket.on("join room", (room) => {
//         socket.join(room)
//     });

// });

// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (validateToken(token)) {
//         next();
//     } else {
//         const err = new Error("not authorized");
//         next(err)
//     }
// });
io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join-chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

    socket.on("new-message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message-recieved", newMessageRecieved);
        });
    });
});
httpServer.listen(3000);


