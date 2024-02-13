const UserMap = require("../models/userMapModel");

const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const userSocketMap = [];
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log("Connected", socket.id);
    console.log(socket.handshake.query.uID);
    const uID = socket.handshake.query.uID;
    if (uID) {
        const userMap = new UserMap(uID, socket.id);
        userSocketMap.push(userMap.theMap());
    }
    io.emit("getOnlineUsers", userSocketMap);
    socket.on("new-message", (newMessageRecieved) => {
        const chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message-recieved", newMessageRecieved);
        });
    });
    socket.on("disconnect", () => {
        console.log("Disconnected", socket.id);
        const index = userSocketMap.findIndex((user) => user.socketID === socket.id);
        if (index > -1) {
            userSocketMap.splice(index, 1);
        }
        io.emit("getOnlineUsers", userSocketMap);
    });
});

module.exports = { server, io, app }