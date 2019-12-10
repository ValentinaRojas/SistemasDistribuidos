var express = require('express');
var path = require('path')

var app = express();


app.get( '/' ,  ( req, res ) => {
  res.send ( '<h1> Hola mundo </h1>' );
});


app.get( '/sala' ,  ( req, res ) => {
  res.sendFile(path.join(__dirname, './views/sala.html'));
});

server = app.listen ( 3000 ,  () => { console .log ( 'escuchando en *: 3000' ); });

const io = require("socket.io")(server)


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
