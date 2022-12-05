export default (io) => {
    io.on("connection", (socket) => {
        console.log("nuevo socket connectado:", socket.id);
        
        

        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });
    });
};