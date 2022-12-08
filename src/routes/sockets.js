export default (io) => {
    io.on("connection", (socket) => {
        console.log("nuevo socket connectado:", socket.id);
        
        

        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });
        socket.on("editar")
    });
    function ping()
    {
        io.on("ping", (socket) => {
            console.log("nuevo socket connectado:", socket.id);
            var cosa = {cosa:"cos"}
            socket.emit("pong",cosa)
            socket.on("disconnect", () => {
                console.log(socket.id, "disconnected");
            });
        });
    }
};