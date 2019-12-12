var express = require('express');
var path = require('path');
var fs = require('fs');


var app = express();


app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.get( '/' ,  ( req, res ) => {
  res.sendFile(path.join(__dirname, './views/index1.html'));
});

app.post("/logueo", (req,res) => {
  console.log(req.body);
  var bandera = 0;
  var data = fs.readFileSync('users.txt').toString();
  //console.log(data);
  var textByLine = data.split("\n");
  console.log(textByLine);
  console.log(textByLine.length);

  for(var i=0; i< textByLine.length; i++ ){
    //console.log(textByLine[i]);
    if(textByLine[i] != ''){
      console.log(textByLine[i]);
      var line = textByLine[i].split(' ');
      if(line[0] == req.body.user && line[1] == req.body.contrasena){
        bandera = 1;

      }
    }
  }

  console.log(bandera);
  if(bandera){
    res.redirect('/sala');
  }
  else {
    res.sendFile(path.join(__dirname, './views/index1.html'));
  }




  /*fs.readFile('users.txt', 'utf8', function(err, data) {
	  //console.log(data);
    //res.redirect('/sala');


      var textByLine = data.split("\n");
      console.log(textByLine)
      //res.redirect('/sala')

      textByLine.forEach((item,index)=>{
        console.log(hola);
        console.log(item);
        console.log(index);
        if (item != ''){
          userpass=item.split(" ");
          console.log(userpass);
          console.log(userpass.length);
          user = userpass[0];
          cont = userpass[1];
            if(user = req.body.user){
              res.redirect('/sala')
              return
            }
            else {
              res.sendFile(path.join(__dirname, './views/index1.html'));
              return
            }
        }
      });


  });*/
});

app.post("/registro", (req,res) => {
  console.log(req.body);
  var user = req.body.name
  var cont = req.body.pass
  fs.appendFile('users.txt','\n' + user + ' ' + cont , function (err) {
   if (err){
     res.sendFile(path.join(__dirname, './views/index1.html'));
   }else {
     res.sendFile(path.join(__dirname, './views/index1.html'));
   }
});
  //res.sendFile(path.join(__dirname, './views/index1.html'));
});

app.get( '/sala' ,  ( req, res ) => {
  res.sendFile(path.join(__dirname, './views/sala.html'));
});

server = app.listen ( 3000 ,  () => { console .log ( 'escuchando en *: 3000' ); });

const io = require("socket.io")(server)

//Conexion
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
