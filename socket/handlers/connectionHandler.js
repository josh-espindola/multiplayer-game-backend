/* Gestión de todo lo que sucede mientras el socket esta conectado */

let players = {};

const connectionHandler = (io, socket)=>{

    socket.on("player:join",(data)=>{
        players[socket.id] ={
            userId: data.userId,
            username: data.username
        };
        io.emit("players:update",Object.values(players));
        console.log("jugadores activos", players)
    })

    socket.on("players:get",()=>{
        //Enviar lista de jugadores actuales
        socket.emit("players:update",Object.values(players))
    })

    socket.on("disconnect",()=>{
        console.log("Usuario desconectado",socket.id);

        delete players[socket.id];
        io.emit("players:update",Object.values(players));
        console.log("jugadores activos",players)
    })

}

export { connectionHandler };