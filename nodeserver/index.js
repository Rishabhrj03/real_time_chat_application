//Node server which will handle socket io connection

const io = require('socket.io')(8000)
const users = {}

//listen incoming event
//socket.io event hai bohot saare logo ko leason kargega
//socket.on -> ek perticular connection ke saath hua hai to kya kerenge
//If any new user joins, let other users connected to the server known
io.on('connection',socket =>{
    socket.on('new-user-joined',name=>{
        //console.log("New User",name)
        users[socket.id] = name;
        //jisne join kara hai usko chor ke sab ko name send kardenga
        socket.broadcast.emit('user-joined', name);
    });

    //If someone sends a message, broadcase it to other people 
    socket.on('send',message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    })
    //If someone leave chat, khud hi inbuilt event hai
    socket.on('disconnect',message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})

