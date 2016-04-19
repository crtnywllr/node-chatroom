var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var users = [];

io.on('connection', function(socket) {
    console.log('Client connected');

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('addUser', function(username) {
        socket.username = username;
        users.push(username);
        console.log('New user: ' + username);
        var newUserMsg = username + " has joined the chat.";
        socket.broadcast.emit('message', newUserMsg);
        socket.broadcast.emit('addUser', username);
    });

    socket.on('disconnect', function() {
       // // console.log(username)
        // users.push(username);
        users = users.filter(function(user, index){
            return user !== socket.username;
        });
        
        var disconnectMsg = socket.username + ' has disconnected';
        console.log(users);
        console.log(disconnectMsg);
        socket.broadcast.emit('updateUsers', users);
        socket.broadcast.emit('message', disconnectMsg);
    });
});

server.listen(8080);