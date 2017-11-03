var socket = io();

var handle = document.getElementById('handle'),
    message = document.getElementById('message'),
    send = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

send.addEventListener('click', function() {
  socket.emit('chat message', {
    handle: handle.value,
    message: message.value
  });
});

socket.on('chat message', function(msg) {
  output.innerHTML += '<p><strong>'+msg.handle+'</strong> '+msg.message+'</p>';
  message.value = '';
  feedback.innerHTML = '';
});

message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value);
});

socket.on('typing', function(msg) {
  feedback.innerHTML = '<p><em>'+msg+' is typing...</em></p>';
});
