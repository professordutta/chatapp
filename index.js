const express = require ('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/home',(req,res)=>{
res.sendFile(__dirname+'/chat.html');
}); 

io.on('connection', (socket) => {
    console.log('user connected to server');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    
    socket.on('chatinfo', (data) => {
        console.log('message: ' + data);
        socket.broadcast.emit('chatinfo',data);
    });
  });

server.listen(3000,function(){
    console.log('Listening to port 3000...');
})