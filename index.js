const app = require('express')();
const server = require('http').createServer(app);
const { info } = require('console');
const cors = require('cors');
const { Socket } = require('dgram');
const { Server } = require('http');

const io = require("socket.io")(server,{
    cors: {
        origin: "*",
        method: ["GET","PORT"]
    }
})

app.use(cors())


const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send(`server is running on port ${PORT}`)
});

io.on('connection', (socket)=>{
    socket.emit('me', socket.id);

    socket.on('disconnect',()=>{
        socket.broadcast.emit("callended")
    });

    socket.on("calluser",({userToCall, signalData, from, name})=>{
        io.to(userToCall).emit("calluser",{ signal: signalData, from, name,  });
    });


    socket.on("answercall",()=>{
        io.to(data.to()).emit("callaccepted")
    })
})

server.listen(PORT,()=>console.log(`server is running on port ${PORT}`))