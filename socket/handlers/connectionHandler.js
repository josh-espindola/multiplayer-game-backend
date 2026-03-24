const connectionHandler = (io, socket)=>{
    console.log("Socket conectado :", socket.id);
    socket.on("disconnect",()=>{
        console.log("Usuario desconectado",socket.id);
    })

}

export { connectionHandler };