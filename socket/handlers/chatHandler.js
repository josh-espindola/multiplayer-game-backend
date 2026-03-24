const chatHandler = (io, socket) => {

    socket.on("chat", (data) => {
        console.log("Mensaje del usuario al server", data);
        io.emit("chat", data);
    })

}

export { chatHandler } 