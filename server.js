
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/',(req,res) => {
res.render('index.html');

});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado : ${socket.id}`);
    console.log(messages);
   
    

        socket.on('sendMessage', data =>{
            messages.push(data);
            socket.broadcast.emit('recivedMessage',data);
        });

        socket.on('renderImage', data =>{
           
            messages.push(data);
       
            socket.broadcast.emit('renderImage',data);
        });
    

        socket.on('clickImage', data =>{
           
            messages.push(data);
       
            socket.broadcast.emit('clickImage',data);
        });

    
});

server.listen(3000);

