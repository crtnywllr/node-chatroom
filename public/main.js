$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var userList = $('#userList');
    var username = prompt('What\'s your name?') || "Guest";

//Sending messages
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };
    
    input.on('keydown', function(event) {
    if (event.keyCode != 13) {
        return;
    }

    var message = username + ":" + input.val();
    addMessage(message);
    socket.emit('message', message);
    input.val('');
});

//Updating users

//Add user
  var addUser = function(username) {
        userList.append('<div>' + username + '</div>');
    };
    
    addUser(username);
    socket.emit('addUser', username);
    
//update users after remove 
   var updateUsers = function(users) {
    userList.empty();
    users.forEach(function(username){
        addUser(username);
        socket.emit('updateUsers', users);
    });
        
};
    
    
socket.on('message', addMessage);
socket.on('addUser', addUser);
socket.on('updateUsers', updateUsers);

});